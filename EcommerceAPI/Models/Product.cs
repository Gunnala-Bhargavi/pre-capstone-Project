using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CategoryId { get; set; }

    public int OfferId { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }

    public string ImageName { get; set; } = null!;

    public virtual ProductCategory Category { get; set; } = null!;

    public virtual Offer Offer { get; set; } = null!;
}
