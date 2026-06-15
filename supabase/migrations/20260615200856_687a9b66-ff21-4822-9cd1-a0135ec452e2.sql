
-- Explicit deny-read policies (intent: only service_role / edge functions read)
CREATE POLICY "No public read of bookings"
  ON public.bookings FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "No public read of contact submissions"
  ON public.contact_submissions FOR SELECT
  TO anon, authenticated
  USING (false);

-- Tighten INSERT policies with input validation (replaces WITH CHECK true)
DROP POLICY IF EXISTS "Anyone can submit a booking request" ON public.bookings;
CREATE POLICY "Anyone can submit a booking request"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(phone) BETWEEN 3 AND 32
    AND char_length(event_type) BETWEEN 1 AND 80
    AND char_length(venue_location) BETWEEN 1 AND 200
    AND char_length(budget) BETWEEN 1 AND 80
    AND (requirements IS NULL OR char_length(requirements) <= 2000)
  );

DROP POLICY IF EXISTS "Anyone can submit a contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit a contact form"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR char_length(phone) <= 32)
    AND char_length(message) BETWEEN 1 AND 2000
  );

DROP POLICY IF EXISTS "Anyone can submit a game score" ON public.game_scores;
CREATE POLICY "Anyone can submit a game score"
  ON public.game_scores FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(player_name) BETWEEN 1 AND 40
    AND time_seconds > 0
    AND time_seconds < 3600
  );
