using System;
using System.Collections.Generic;

namespace EcommerceAPI.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public string Review1 { get; set; } = null!;

    public string CreatedAt { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
