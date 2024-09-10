using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class ProductCategory
{
    public int CategoryId { get; set; }

    public string Category { get; set; } = null!;

    public string SubCategory { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
