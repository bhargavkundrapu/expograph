import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../app/providers/AuthProvider";
import { apiFetch } from "../../../services/api";
import { unwrapArray, unwrapData } from "../../../services/apiShape";
import { useFeatureFlags } from "../../../hooks/useFeatureFlags";
import { FEATURE_FLAGS, checkFeatureFlag } from "../../../utils/featureFlags";
import { 
  FaUsers, 
  FaBuilding,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaUserShield,
  FaGraduationCap,
  FaUserTie,
  FaCog
} from "react-icons/fa";
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

function getRoleIcon(roleName) {
  const icons = {
    SuperAdmin: FaUserShield,
    TenantAdmin: FaCog,
    Mentor: FaUserTie,
    Student: FaGraduationCap,
  };
  return icons[roleName] || FaUser;
}

function getRoleBadge(roleName) {
  const badges = {
    SuperAdmin: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-700", label: "SuperAdmin" },
    TenantAdmin: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-700", label: "TenantAdmin" },
    Mentor: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-700", label: "Mentor" },
    Student: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-700", label: "Student" },
  };
  return badges[roleName] || { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-700", label: roleName };
}

function getStatusBadge(isActive) {
  if (isActive) {
    return { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-700", label: "Active" };
  }
  return { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-700", label: "Inactive" };
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

  // Check if users feature is enabled
  const usersEnabled = checkFeatureFlag(isEnabled, FEATURE_FLAGS.TENANT_ADMIN_USERS);

  // Only show disabled message if flags have loaded AND feature is explicitly disabled
  if (!flagsLoading && !usersEnabled) {
    return (
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-8">
          <CardTitle className="text-2xl mb-4">Feature Disabled</CardTitle>
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
      <div className="layout-flex-col gap-lg animate-fadeIn" style={{ width: '100%' }}>
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-64 w-full" />
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
    <div className="layout-flex-col gap-xl animate-fadeIn" style={{ width: '100%' }}>
      {/* Header */}
      <div className="position-relative overflow-hidden rounded-xl sm:rounded-2xl bg-green-50 border border-green-200 p-6 sm:p-10 shadow-soft" style={{ marginBottom: '1rem sm:2rem' }}>
        <div className="position-relative" style={{ zIndex: 10 }}>
          <div className="layout-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-md" style={{ marginBottom: '1rem sm:1.5rem' }}>
            <div className="p-3 sm:p-4 rounded-xl bg-green-600 shadow-medium">
              <FaUsers className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h1 className="section-hero text-2xl sm:text-4xl" style={{ marginBottom: '0.5rem', marginTop: 0 }}>User Management</h1>
              <p className="text-gray-600 text-base sm:text-lg" style={{ margin: 0 }}>Manage users and permissions within your tenant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="layout-grid-2 sm:grid-cols-3 gap-4 sm:gap-lg" style={{ width: '100%' }}>
        <Card variant="elevated" className="p-4 sm:p-6">
          <div className="layout-flex items-center gap-3 sm:gap-md">
            <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
              <FaUsers className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{stats.total}</div>
              <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>Total Users</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-4 sm:p-6">
          <div className="layout-flex items-center gap-3 sm:gap-md">
            <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
              <FaCheckCircle className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{stats.active}</div>
              <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>Active</div>
            </div>
          </div>
        </Card>

        <Card variant="elevated" className="p-4 sm:p-6">
          <div className="layout-flex items-center gap-3 sm:gap-md">
            <div className="p-2 sm:p-3 rounded-xl bg-green-600 shadow-medium">
              <FaGraduationCap className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900" style={{ margin: 0 }}>{stats.students}</div>
              <div className="text-xs sm:text-sm text-gray-600" style={{ margin: 0 }}>Students</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          message="There are no users registered for this tenant yet."
        />
      ) : (
        <div className="layout-flex-col gap-md" style={{ width: '100%' }}>
          {users.map((user, idx) => {
            const roleBadge = getRoleBadge(user.role_name);
            const statusBadge = getStatusBadge(user.is_active);
            const RoleIcon = getRoleIcon(user.role_name);
            
            return (
              <Card
                key={user.id}
                variant="elevated"
                className="p-4 sm:p-6 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.05}s`, width: '100%', boxSizing: 'border-box' }}
              >
                <div className="layout-flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-md">
                  <div className="layout-flex items-center gap-3 sm:gap-md" style={{ flex: 1 }}>
                    <div className={`p-2 sm:p-3 rounded-xl ${roleBadge.bg} border ${roleBadge.border}`}>
                      <RoleIcon className={`${roleBadge.text} text-lg sm:text-xl`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl mb-1" style={{ margin: 0 }}>
                        {user.full_name || user.email}
                      </CardTitle>
                      <div className="layout-flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
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

                  <div className="layout-flex flex-wrap items-center gap-2 sm:gap-md">
                    <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${roleBadge.bg} border ${roleBadge.border} ${roleBadge.text}`}>
                      {roleBadge.label}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold ${statusBadge.bg} border ${statusBadge.border} ${statusBadge.text}`}>
                      {statusBadge.label}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={FaEdit}
                      onClick={() => {
                        setSelectedUser(user);
                        setEditForm({
                          roleId: user.role_id,
                          isActive: user.is_active,
                        });
                      }}
                    >
                      <span className="hidden sm:inline">Edit</span>
                      <span className="sm:hidden">Edit</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {selectedUser && (
        <div className="position-fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedUser(null)}>
          <Card
            variant="elevated"
            className="p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardTitle className="text-xl sm:text-2xl mb-4">Edit User</CardTitle>
            <CardDescription className="mb-6">
              {selectedUser.full_name || selectedUser.email}
            </CardDescription>

            <div className="layout-flex-col gap-md mb-6">
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Role *</label>
                <select
                  value={editForm.roleId}
                  onChange={(e) => setEditForm({ ...editForm, roleId: e.target.value })}
                  className="w-full border-2 border-green-200 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="layout-flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                  className="h-5 w-5 accent-green-600 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-gray-900 text-sm sm:text-base cursor-pointer">
                  User is active
                </label>
              </div>
            </div>

            <div className="layout-flex flex-col sm:flex-row gap-3 sm:gap-md items-stretch sm:items-center">
              <Button
                variant="gradient"
                size="md"
                onClick={() => updateUserRole(selectedUser.id)}
                disabled={updating || !editForm.roleId}
                fullWidth
                className="sm:w-auto"
              >
                {updating ? "Updating..." : "Update Role"}
              </Button>
              <Button
                variant={editForm.isActive ? "destructive" : "gradient"}
                size="md"
                onClick={() => updateUserStatus(selectedUser.id, !editForm.isActive)}
                disabled={updating}
                fullWidth
                className="sm:w-auto"
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
                fullWidth
                className="sm:w-auto"
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

