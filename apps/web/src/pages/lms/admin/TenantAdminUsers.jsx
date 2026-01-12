import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import Card, { CardTitle, CardDescription } from "../../../Components/ui/Card";
import Skeleton from "../../../Components/ui/Skeleton";
import ErrorState from "../../../Components/common/ErrorState";
import EmptyState from "../../../Components/common/EmptyState";
import Button from "../../../Components/ui/Button";

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getRoleBadge(roleName) {
  const badges = {
    SuperAdmin: { label: "SuperAdmin" },
    TenantAdmin: { label: "TenantAdmin" },
    Mentor: { label: "Mentor" },
    Student: { label: "Student" },
  };
  return badges[roleName] || { label: roleName };
}

function getStatusBadge(isActive) {
  if (isActive) {
    return { label: "Active" };
  }
  return { label: "Inactive" };
}

export default function TenantAdminUsers() {
  const { token } = useAuth();
  const { isEnabled, loading: flagsLoading } = useFeatureFlags();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    roleId: "",
    isActive: true,
  });
  const [updating, setUpdating] = useState(false);
  const alive = useRef(true);

  const usersEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_USERS);

  if (!flagsLoading && !usersEnabled) {
    return (
      <div>
        <Card variant="elevated">
          <CardTitle>Feature Disabled</CardTitle>
          <CardDescription>User management feature is currently disabled by the administrator.</CardDescription>
        </Card>
      </div>
    );
  }

  async function loadUsers(signal) {
    setErr("");
    setLoading(true);
    try {
      const json = await apiFetch("/api/v1/admin/users", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setUsers(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load users:", e);
      if (alive.current) setErr(e?.message || "Failed to load users");
    } finally {
      if (!signal?.aborted && alive.current) setLoading(false);
    }
  }

  async function loadRoles(signal) {
    try {
      const json = await apiFetch("/api/v1/admin/users/roles", { token, signal });
      const list = unwrapArray(json);
      if (alive.current) setRoles(list);
    } catch (e) {
      if (signal?.aborted) return;
      console.error("Failed to load roles:", e);
    }
  }

  async function updateUserRole(userId) {
    if (!editForm.roleId) {
      alert("Please select a role");
      return;
    }

    setUpdating(true);
    try {
      await apiFetch(`/api/v1/admin/users/${userId}/role`, {
        method: "PATCH",
        token,
        body: { roleId: editForm.roleId },
      });
      
      alert("User role updated successfully!");
      setSelectedUser(null);
      setEditForm({ roleId: "", isActive: true });
      
      const ac = new AbortController();
      await loadUsers(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to update user role");
    } finally {
      setUpdating(false);
    }
  }

  async function updateUserStatus(userId, isActive) {
    setUpdating(true);
    try {
      await apiFetch(`/api/v1/admin/users/${userId}/status`, {
        method: "PATCH",
        token,
        body: { isActive },
      });
      
      alert(`User ${isActive ? 'activated' : 'deactivated'} successfully!`);
      setSelectedUser(null);
      
      const ac = new AbortController();
      await loadUsers(ac.signal);
    } catch (e) {
      alert(e?.message || "Failed to update user status");
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    alive.current = true;
    const ac = new AbortController();
    setLoading(true);
    loadUsers(ac.signal);
    loadRoles(ac.signal);
    return () => {
      alive.current = false;
      ac.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (err) {
    return (
      <ErrorState 
        title="Failed to Load Users" 
        message={err} 
        onRetry={() => {
          const ac = new AbortController();
          loadUsers(ac.signal);
        }} 
      />
    );
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
    students: users.filter(u => u.role_name === "Student").length,
    mentors: users.filter(u => u.role_name === "Mentor").length,
    admins: users.filter(u => u.role_name === "TenantAdmin" || u.role_name === "SuperAdmin").length,
  };

  return (
    <div>
      <div>
        <div>
        </div>
        <div>
          <div>
            <div>
            </div>
            <div>
              <h1>User Management</h1>
              <p>Manage users and permissions within your tenant</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.total}</div>
              <div>Total Users</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.active}</div>
              <div>Active</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div>
            <div>
            </div>
            <div>
              <div>{stats.students}</div>
              <div>Students</div>
            </div>
          </div>
        </Card>
      </div>

      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          message="There are no users registered for this tenant yet."
        />
      ) : (
        <div>
          {users.map((user, idx) => {
            const roleBadge = getRoleBadge(user.role_name);
            const statusBadge = getStatusBadge(user.is_active);
            
            return (
              <Card
                key={user.id}
                variant="elevated"
              >
                <div>
                  <div>
                    <div>
                    </div>
                    <div>
                      <CardTitle>
                        {user.full_name || user.email}
                      </CardTitle>
                      <div>
                        <span>{user.email}</span>
                        {user.phone && (
                          <>
                            <span>•</span>
                            <span>{user.phone}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>Joined: {formatDate(user.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span>
                      {roleBadge.label}
                    </span>
                    <span>
                      {statusBadge.label}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setEditForm({
                          roleId: user.role_id,
                          isActive: user.is_active,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {selectedUser && (
        <div onClick={() => setSelectedUser(null)}>
          <Card
            variant="elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle>Edit User</CardTitle>
            <CardDescription>
              {selectedUser.full_name || selectedUser.email}
            </CardDescription>

            <div>
              <div>
                <label>Role *</label>
                <select
                  value={editForm.roleId}
                  onChange={(e) => setEditForm({ ...editForm, roleId: e.target.value })}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                />
                <label htmlFor="isActive">
                  User is active
                </label>
              </div>
            </div>

            <div>
              <Button
                variant="gradient"
                size="md"
                onClick={() => updateUserRole(selectedUser.id)}
                disabled={updating || !editForm.roleId}
              >
                {updating ? "Updating..." : "Update Role"}
              </Button>
              <Button
                variant={editForm.isActive ? "destructive" : "gradient"}
                size="md"
                onClick={() => updateUserStatus(selectedUser.id, !editForm.isActive)}
                disabled={updating}
              >
                {updating ? "Updating..." : editForm.isActive ? "Deactivate User" : "Activate User"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedUser(null);
                  setEditForm({ roleId: "", isActive: true });
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
