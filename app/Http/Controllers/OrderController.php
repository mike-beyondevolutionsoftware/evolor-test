<?php

namespace App\Http\Controllers;

use App\Mail\OrderPlaced;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $products = [];
        $totalAmount = 0;

        foreach ($request->items as $key => $item) {
            $products[$key] = Product::find($item['id']);
            $products[$key]->quantity = $item['quantity'];
            $totalAmount += $products[$key]->price * $products[$key]->quantity;
        }

        if ($user->balance < $totalAmount) {
            return response()->json(['error' => 'Insufficient funds'], 400);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'address' => $request->address,
            'details' => json_encode($products),
            'total_price' => $totalAmount
        ]);

        $user->balance -= $totalAmount;
        $user->save();

        Mail::to($user->email)->send(new OrderPlaced($order));

        return response()->json(['message' => 'Order successful', 'order' => $order], 201);
    }
}
