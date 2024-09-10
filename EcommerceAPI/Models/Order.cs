using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int CartId { get; set; }

    public int PaymentId { get; set; }

    public string CreatedAt { get; set; } = null!;

    public virtual Cart Cart { get; set; } = null!;

    public virtual Payment Payment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
