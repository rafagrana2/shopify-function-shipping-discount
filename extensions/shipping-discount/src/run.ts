import type {
  RunInput,
  FunctionRunResult,
  Target
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const targets: Target[] = input.cart.cost.totalAmount.amount;

  const DISCOUNTED_SHIPPING: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        targets: targets,
        value: {
          percentage: {
            value: 10
          }
        },
        message: "10% OFF"
      }
    ]
  }
  return DISCOUNTED_SHIPPING;
};