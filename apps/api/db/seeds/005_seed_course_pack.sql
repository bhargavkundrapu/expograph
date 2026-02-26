-- Sample course pack for testing payments
INSERT INTO course_packs (tenant_id, title, slug, description, price_in_paise, status)
SELECT id, 'All Pack', 'all-pack', 'Access to all courses and materials', 19900, 'published'
FROM tenants WHERE slug = 'expograph' LIMIT 1
ON CONFLICT (tenant_id, slug) DO NOTHING;
