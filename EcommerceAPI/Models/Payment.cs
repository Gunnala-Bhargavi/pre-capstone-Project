using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int PaymentMethodId { get; set; }

    public int TotalAmount { get; set; }

    public int ShippingCharges { get; set; }

    public int AmountReduced { get; set; }

    public int AmountPaid { get; set; }

    public string CreatedAt { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
