-- Create contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contacts (no auth needed for form submission)
CREATE POLICY "Allow public to insert contacts" ON contacts 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to view contacts (optional - can be removed if not needed)
CREATE POLICY "Allow public to view contacts" ON contacts 
  FOR SELECT 
  USING (true);
