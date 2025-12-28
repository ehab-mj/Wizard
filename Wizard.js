
class Wizard {
    #health;
    #mana;
    constructor(name, startingHealth, startingMana) {
        this.name = name;
        this.#health = startingHealth;
        this.#mana = startingMana;
        this.maxHealth = startingHealth;
        this.maxMana = startingMana;
    }
    isAlive() {
        return this.#health > 0
    }

    getStatus() {
        return {
            name: this.name,
            health: this.#health,
            mana: this.#mana
        }
    }

    receiveDamage(amount) {
        if (amount <= 0)
            return;
        this.#health = this.#health - amount;

        if (this.#health < 0)
            this.#health = 0;
    }

    spendMana(cost) {
        if (cost <= 0) {
            return false;
        }
        if (this.#mana < cost) {
            return false;
        }
        this.#mana = this.#mana - cost;
        return true;
    }


    castSpell(opponent) {
        console.log("Generic wizard spell");
    }
}


class FireWizard extends Wizard {
    castSpell(opponent) {
        const manaCost = 10;
        const damage = 20;

        if (!this.isAlive()) {
            console.log("cannot Act");
            return;
        }

        if (!this.spendMana(manaCost)) {
            console.log("not enough mana");
            return;
        }

        opponent.receiveDamage(damage)

        console.log(`${this.name} cast Fire spell on ${opponent.name} for ${damage} damage cost 20 mana`);
    }
}

class IceWizard extends Wizard {
    castSpell(opponent) {
        const manaCost = 10;
        const damage = 25;
        const extraMana = 10;

        if (!this.isAlive()) {
            console.log("cannot Act");
            return;
        }

        if (!this.spendMana(manaCost)) {
            console.log("not enough mana");
            return;
        }

        opponent.receiveDamage(damage)
        opponent.spendMana(extraMana)

        console.log(`${this.name} cast Ice spell on ${opponent.name} for ${damage} damage cost 10 mana`);
    }
}

class Duel {
    constructor(wizardA, wizardB) {
        this.wizardA = wizardA;
        this.wizardB = wizardB;
        this.roundNumber = 1;
    }

    printRoundStatus() {
        console.log(this.wizardA.getStatus())
        console.log(this.wizardB.getStatus())
    }

    run() {
        console.log("Duel begins!");
        this.printRoundStatus();

        while (this.wizardA.isAlive() && this.wizardB.isAlive()) {
            console.log(`Round ${this.roundNumber}`);

            this.wizardA.castSpell(this.wizardB)

            if (!this.wizardB.isAlive()) break;

            this.wizardB.castSpell(this.wizardA)

            this.printRoundStatus()
            this.roundNumber = this.roundNumber + 1;
        }

        if (this.wizardA.isAlive()) {
            console.log("Winner:" + this.wizardA.name);
        } else {
            console.log("Winner:" + this.wizardB.name);
        }
    }
}

const wiz1 = new FireWizard("FireBall", 100, 100);
const wiz2 = new IceWizard("Freezy", 100, 100);
const duel = new Duel(wiz1, wiz2);
duel.run();