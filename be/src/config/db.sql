// Người dùng
Table Users {
  id int [pk, increment]
  name varchar(100)
  email varchar(100) [unique]
  password varchar(255)
  phone varchar(10)
  role enum('admin', 'user')
  created_at datetime
}

// Sản phẩm
Table Products {
  id int [pk, increment]
  name varchar(100)
  brand varchar(100)
  description text
  price decimal(10,2)
  stock int
  image_url varchar(255)
  category enum('mouse', 'keyboard', 'headphone')
  sold_count int [default: 0] // hỗ trợ thống kê bán chạy
  discount_id int [ref: - Discounts.id]
  created_at datetime
}

// Chi tiết chuột
Table MouseDetails {
  id int [pk, ref: > Products.id]
  dpi int
  sensor_type varchar(50)
  wireless boolean
  rgb boolean
  buttons int
}

// Chi tiết bàn phím
Table KeyboardDetails {
  id int [pk, ref: > Products.id]
  switch_type varchar(50)
  layout varchar(50)
  key_rollover varchar(50)
  wireless boolean
  rgb boolean
}

// Chi tiết tai nghe
Table HeadphoneDetails {
  id int [pk, ref: > Products.id]
  driver_size varchar(50)
  frequency_response varchar(50)
  wireless boolean
  microphone boolean
  surround_sound boolean
}

// Bảng Giảm giá
Table Discounts {
  id int [pk, increment]
  code varchar(50)
  description text
  discount_type enum('percent', 'fixed') // phần trăm hoặc số tiền cố định
  discount_value decimal(10,2)
  start_date datetime
  end_date datetime
  active boolean
}

// Banner (quảng cáo)
Table Banners {
  id int [pk, increment]
  title varchar(100)
  image_url varchar(255)
  link_url varchar(255)
  position enum('homepage', 'category', 'product') // vị trí hiển thị
  is_active boolean
  created_at datetime
}

// Giỏ hàng
Table Carts {
  id int [pk, increment]
  user_id int [ref: > Users.id]
  created_at datetime
}

// Mục trong giỏ hàng
Table CartItems {
  id int [pk, increment]
  cart_id int [ref: > Carts.id]
  product_id int [ref: > Products.id]
  quantity int
}

// Đơn hàng
Table Orders {
  id int [pk, increment]
  user_id int [ref: > Users.id]
  phone varchar(20)
  address text
  total_amount decimal(10,2)
  status varchar(50) // pending, completed, canceled
  payment_method varchar(50)
  created_at datetime
}

// Chi tiết đơn hàng
Table OrderItems {
  id int [pk, increment]
  order_id int [ref: > Orders.id]
  product_id int [ref: > Products.id]
  quantity int
  price decimal(10,2)
}

// Đánh giá sản phẩm
Table Reviews {
  id int [pk, increment]
  user_id int [ref: > Users.id]
  product_id int [ref: > Products.id]
  rating int // 1-5 stars
  comment text
  created_at datetime
}


