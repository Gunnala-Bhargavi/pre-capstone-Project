using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public int? CartId { get; set; }

    public int? ProductId { get; set; }
}
