<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
</head>
<body>
<h1>Thank you for your purchase, {{ $user->name }}!</h1>
<p>Your order has been placed successfully.</p>

<ul>
    @foreach (json_decode($order->details) as $item)
        <li>{{ $item->name }} (x{{ $item->quantity }}) - ${{ $item->price * $item->quantity }}</li>
    @endforeach
</ul>

<p>Total Amount: ${{ $order->total_price }}</p>
</body>
</html>
