import type {
  RunInput,
  FunctionRunResult,
  Target
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

export function run(input: RunInput): FunctionRunResult {
  const cartTotal: number = parseFloat(input.cart.cost.totalAmount.amount);

  const targets: Target[] = input.cart.deliveryGroups.map(group => ({
    "deliveryGroup": {
      "id": group.id
    }
  }));

  const EMPTY_DISCOUNT: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [],
  };

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

  if (cartTotal > 50) {
    return DISCOUNTED_SHIPPING;
  } else {
    return EMPTY_DISCOUNT;
  }
};