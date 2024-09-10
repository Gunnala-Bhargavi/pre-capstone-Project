using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Offer
{
    public int OfferId { get; set; }

    public string Title { get; set; } = null!;

    public int Discount { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
