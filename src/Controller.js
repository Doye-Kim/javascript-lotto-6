import { Random, Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";
import Bonus from "./Bonus";
import Buy from "./Buy";
import Result from "./Result";

import InputMessages from "./views/InputMessages";
import OutputMessages from "./views/OutputMessages";

class Controller {
  #buy;
  #lotto;
  #bonus;
  #result = new Result();
  async run() {
    await this.getPurchaseAmount();
    await this.handlePurchaseAmount(this.#buy.getAmount());

    OutputMessages.printCountMessage(this.#buy);
    OutputMessages.printRandomNumbers(this.#buy);
  }

  async getPurchaseAmount() {
    while (true) {
      try {
        const input = await InputMessages.inputAmount();
        this.#buy = new Buy(Number(input));
        break;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handlePurchaseAmount(amount) {
    await this.#buy.setCount(amount / 1000);
    for (let i = 0; i < amount / 1000; i++) {
      await this.#buy.setRandomNumbers(
        Random.pickUniqueNumbersInRange(1, 45, 6)
      );
    }
  }
}
export default Controller;