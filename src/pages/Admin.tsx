import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Download, FileSpreadsheet, Users, Calendar, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "stagefright2024";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "contacts">("bookings");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, contactsRes] = await Promise.all([
        supabase.functions.invoke("export-data", { body: { type: "bookings" } }),
        supabase.functions.invoke("export-data", { body: { type: "contacts" } }),
      ]);

      // Parse CSV to display in table
      if (bookingsRes.data) {
        const rows = parseCSV(typeof bookingsRes.data === 'string' ? bookingsRes.data : '');
        setBookings(rows);
      }
      if (contactsRes.data) {
        const rows = parseCSV(typeof contactsRes.data === 'string' ? contactsRes.data : '');
        setContacts(rows);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseCSV = (csv: string) => {
    if (!csv) return [];
    const lines = csv.trim().split("\n");
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map(h => h.replace(/"/g, '').trim());
    return lines.slice(1).map(line => {
      const values = line.match(/(".*?"|[^",]+)/g)?.map(v => v.replace(/^"|"$/g, '').trim()) || [];
      const obj: any = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    });
  };

  const handleExport = async (type: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("export-data", {
        body: { type },
      });
      if (error) throw error;

      const csvData = typeof data === 'string' ? data : JSON.stringify(data);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({ title: "Export successful! 📥", description: `${type} data downloaded as CSV.` });
    } catch (error) {
      toast({ title: "Export failed", description: "Please try again.", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-20 section-padding">
          <div className="container-custom max-w-md">
            <Card className="bg-card border-maroon-bright/50 p-8 glow-border-maroon">
              <h1 className="font-display text-3xl font-bold text-gradient-maroon mb-6 text-center">Admin Panel</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="bg-background border-maroon-bright/30 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground font-semibold">
                  Login
                </Button>
              </form>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-8 section-padding">
        <div className="container-custom">
          <h1 className="font-display text-5xl font-bold text-gradient-maroon glow-text-maroon mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage bookings, contacts & export data</p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-maroon-bright/30 p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-10 w-10 text-maroon-bright" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
                  <p className="text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </Card>
            <Card className="bg-card border-maroon-bright/30 p-6">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-maroon-neon" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{contacts.length}</p>
                  <p className="text-muted-foreground">Contact Messages</p>
                </div>
              </div>
            </Card>
            <Card className="bg-card border-maroon-bright/30 p-6">
              <div className="flex items-center gap-4">
                <FileSpreadsheet className="h-10 w-10 text-gold-indian" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Export Data</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => handleExport("bookings")} className="border-maroon-bright/50 text-foreground hover:bg-maroon-bright/20">
                      <Download className="h-3 w-3 mr-1" /> Bookings
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleExport("contacts")} className="border-maroon-bright/50 text-foreground hover:bg-maroon-bright/20">
                      <Download className="h-3 w-3 mr-1" /> Contacts
                    </Button>
                    <Button size="sm" onClick={() => handleExport("all")} className="bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground">
                      <Download className="h-3 w-3 mr-1" /> All
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "bookings" ? "bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === "contacts" ? "bg-gradient-to-r from-maroon-bright to-maroon-neon text-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}
            >
              Contacts ({contacts.length})
            </button>
          </div>

          {/* Data Table */}
          <Card className="bg-card border-maroon-bright/30 overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-12 text-center text-muted-foreground">Loading data...</div>
              ) : activeTab === "bookings" ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 text-maroon-bright font-semibold">Name</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Email</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Phone</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Event</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Venue</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Date</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Budget</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">No bookings yet</td></tr>
                    ) : bookings.map((b, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 text-foreground font-medium">{b.Name}</td>
                        <td className="p-4"><a href={`mailto:${b.Email}`} className="text-maroon-bright hover:text-maroon-neon">{b.Email}</a></td>
                        <td className="p-4"><a href={`https://wa.me/${b.Phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-maroon-bright hover:text-maroon-neon">{b.Phone}</a></td>
                        <td className="p-4 text-muted-foreground">{b["Event Type"]}</td>
                        <td className="p-4 text-muted-foreground">{b["Venue Location"]}</td>
                        <td className="p-4 text-muted-foreground">{b["Event Date"]}</td>
                        <td className="p-4 text-muted-foreground">{b.Budget}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded-full text-xs bg-maroon-bright/20 text-maroon-bright">{b.Status || 'pending'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="text-left p-4 text-maroon-bright font-semibold">Name</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Email</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Phone</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Message</th>
                      <th className="text-left p-4 text-maroon-bright font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No contact messages yet</td></tr>
                    ) : contacts.map((c, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 text-foreground font-medium">{c.Name}</td>
                        <td className="p-4"><a href={`mailto:${c.Email}`} className="text-maroon-bright hover:text-maroon-neon">{c.Email}</a></td>
                        <td className="p-4 text-muted-foreground">{c.Phone || '-'}</td>
                        <td className="p-4 text-muted-foreground max-w-xs truncate">{c.Message}</td>
                        <td className="p-4 text-muted-foreground">{c["Submitted At"] ? new Date(c["Submitted At"]).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
