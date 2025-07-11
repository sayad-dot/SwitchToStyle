/*
  # Update Admin Email

  1. Changes
    - Update admin email from iffatlabiba03@gmail.com to iffatlabiba2003@gmail.com in all RLS policies
    - This ensures the admin functionality works with the correct email

  2. Security
    - Update all admin-related policies to use the new email
*/

-- Update products policies
DROP POLICY IF EXISTS "Admin can manage products" ON products;
CREATE POLICY "Admin can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'iffatlabiba2003@gmail.com'
    )
  );

-- Update orders policies
DROP POLICY IF EXISTS "Admin can read all orders" ON orders;
CREATE POLICY "Admin can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'iffatlabiba2003@gmail.com'
    )
  );

DROP POLICY IF EXISTS "Admin can update orders" ON orders;
CREATE POLICY "Admin can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'iffatlabiba2003@gmail.com'
    )
  );

-- Update order items policies
DROP POLICY IF EXISTS "Admin can read all order items" ON order_items;
CREATE POLICY "Admin can read all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'iffatlabiba2003@gmail.com'
    )
  );