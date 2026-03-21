'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { User } from '@/lib/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New user form
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'EDITOR' | 'ADMIN'>('EDITOR');
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data as User[]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newPassword.trim()) return;
    setCreating(true);
    try {
      await api.createUser({ email: newEmail.trim(), password: newPassword, role: newRole });
      setNewEmail('');
      setNewPassword('');
      setNewRole('EDITOR');
      fetchUsers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to create user');
    }
    setCreating(false);
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await api.updateUserRole(id, role);
      fetchUsers();
    } catch {
      alert('Failed to update role');
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Delete user "${email}"? This cannot be undone.`)) return;
    try {
      await api.deleteUser(id);
      fetchUsers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete user ');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-primary">Users</h1>
        <p className="text-sm font-body text-text-secondary mt-1">Manage admin and editor accounts</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-red-700 text-sm font-body">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users list */}
        <div className="lg:col-span-2 admin-card">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">All Users</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-background rounded animate-pulse" />
              ))}
            </div>
          ) : users.length > 0 ? (
            <div className="divide-y divide-border-light">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center opacity-70">
                      <span className="text-white font-display font-bold text-sm">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-primary">{user.email}</p>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="text-xs font-body text-text-muted mt-0.5 border-0 bg-transparent cursor-pointer focus:ring-0 p-0"
                        aria-label={`Role for ${user.email}`}
                      >
                        <option value="EDITOR">Editor</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id, user.email)}
                    className="text-xs font-body text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete user ${user.email}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted font-body py-8 text-center">No users found</p>
          )}
        </div>

        {/* Add user form */}
        <div className="admin-card h-fit">
          <h2 className="font-display text-lg font-semibold text-primary mb-4">Add User</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label htmlFor="new-user-email" className="admin-label">Email</label>
              <input
                id="new-user-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="admin-input"
                placeholder="user@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="new-user-password" className="admin-label">Password</label>
              <input
                id="new-user-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="admin-input"
                placeholder="Min. 8 characters"
                minLength={8}
                required
              />
            </div>
            <div>
              <label htmlFor="new-user-role" className="admin-label">Role</label>
              <select
                id="new-user-role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as 'EDITOR' | 'ADMIN')}
                className="admin-input"
              >
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="w-full btn-primary text-xs disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
