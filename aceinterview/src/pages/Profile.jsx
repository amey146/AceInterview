import React, { useEffect, useState } from "react";
import { LogOut, UserCircle2, Loader2, Edit3, Save } from "lucide-react";
import useAuth from "../utils/hooks";
import { getUserProfile, updateUserProfile } from "../utils/api";

export default function Profile() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [saving, setSaving] = useState(false);

    // Fetch profile from server
    useEffect(() => {
        let mounted = true;

        async function fetchProfile() {
            try {
                const data = await getUserProfile();
                if (mounted && data?.user) {
                    setProfile(data.user);
                    setFormData({ name: data.user.name, email: data.user.email, password: "" });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchProfile();
        return () => (mounted = false);
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await updateUserProfile(formData);
            if (res?.user) {
                setProfile(res.user);
                setEditMode(false);
                setFormData({ ...formData, password: "" });
            }
        } catch (err) {
            console.error("Error saving profile:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
            <div className="w-full max-w-lg bg-[var(--card)]/90 border border-[var(--border)] backdrop-blur-sm shadow-[var(--shadow-md)] rounded-2xl p-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                        <UserCircle2 className="w-12 h-12 text-[var(--primary)]" />
                    </div>

                    <h2 className="text-3xl font-bold text-[var(--primary)] mb-2">
                        Your Profile
                    </h2>
                    <p className="text-[var(--muted-foreground)] mb-8">
                        Manage your details and account information
                    </p>

                    {/* Profile Details */}
                    <div className="text-left w-full px-6 space-y-5">
                        <div>
                            <label className="text-sm font-semibold text-[var(--muted-foreground)]">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none ${editMode ? "focus:ring-2 focus:ring-[var(--primary)]" : "opacity-70"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[var(--muted-foreground)]">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none ${editMode ? "focus:ring-2 focus:ring-[var(--primary)]" : "opacity-70"
                                    }`}
                            />
                        </div>

                        {editMode && (
                            <div>
                                <label className="text-sm font-semibold text-[var(--muted-foreground)]">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Leave blank to keep current"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">
                        {editMode ? (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 bg-[var(--primary)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--primary-hover)] transition-all duration-300"
                            >
                                {saving ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="flex items-center gap-2 bg-[var(--primary)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--primary-hover)] transition-all duration-300"
                            >
                                <Edit3 className="w-5 h-5" />
                                Edit Profile
                            </button>
                        )}

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-[var(--destructive)] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[var(--destructive-hover)] transition-all duration-300"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
