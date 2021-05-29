export abstract class Discount {
  protected discount = 0

  calculate(price: number): number {
    return price * (1 - this.discount)
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount: number = 0.5
}

export class TenPercentDiscount extends Discount {
  protected readonly discount: number = 0.1
}

export class NoDiscount extends Discount {}
