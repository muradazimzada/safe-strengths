-- Create the safety_plans table
CREATE TABLE IF NOT EXISTS safety_plans (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    responses JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
