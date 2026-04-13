
CREATE TABLE public.game_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  time_seconds NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view game scores"
ON public.game_scores
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can submit a game score"
ON public.game_scores
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
