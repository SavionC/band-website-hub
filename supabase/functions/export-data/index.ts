import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { type } = await req.json();

    let csvContent = "";
    let filename = "";

    if (type === "bookings") {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;

      csvContent = "Name,Email,Phone,Event Type,Venue Location,Event Date,Budget,Requirements,Status,Submitted At\n";
      (data || []).forEach((row: any) => {
        csvContent += `"${row.name}","${row.email}","${row.phone}","${row.event_type}","${row.venue_location}","${row.event_date}","${row.budget}","${row.requirements || ''}","${row.status || 'pending'}","${row.created_at}"\n`;
      });
      filename = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === "contacts") {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;

      csvContent = "Name,Email,Phone,Message,Submitted At\n";
      (data || []).forEach((row: any) => {
        csvContent += `"${row.name}","${row.email}","${row.phone || ''}","${row.message}","${row.created_at}"\n`;
      });
      filename = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    } else if (type === "all") {
      const [bookingsRes, contactsRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      ]);
      if (bookingsRes.error) throw bookingsRes.error;
      if (contactsRes.error) throw contactsRes.error;

      csvContent = "Type,Name,Email,Phone,Details,Date,Status,Submitted At\n";
      (bookingsRes.data || []).forEach((row: any) => {
        csvContent += `"Booking","${row.name}","${row.email}","${row.phone}","${row.event_type} at ${row.venue_location} | Budget: ${row.budget}${row.requirements ? ' | ' + row.requirements : ''}","${row.event_date}","${row.status || 'pending'}","${row.created_at}"\n`;
      });
      (contactsRes.data || []).forEach((row: any) => {
        csvContent += `"Contact","${row.name}","${row.email}","${row.phone || ''}","${row.message}","","","${row.created_at}"\n`;
      });
      filename = `all_inquiries_${new Date().toISOString().split('T')[0]}.csv`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(csvContent, {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="${filename}"` },
    });
  } catch (error) {
    console.error("Export error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
