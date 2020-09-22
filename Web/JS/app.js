let dataOfTheGame = {
    symbolPlayer: "X",
    symbolComputer: "O",
    possiblities: [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6],
    message: "",
    gridBoxes: document.getElementsByClassName("box"),
    gameOver: false
}

let game = new Vue({
    el: '#game',
    data: dataOfTheGame,
    methods: {

        playerTouchGridBox: function (e) {
            this.drawTheSymbolInTheBox(e.target, "player")
        },

        drawTheSymbolInTheBox: function (box, whoDraw) {

            if (box.innerHTML == "" && this.gameOver == false) {
                if (whoDraw == "player") {
                    let self = this
                    console.log("Le joueur à joué !")
                    box.innerHTML = "X"
                    box.style.color = "#1abc9c"
                    this.checkWinner()
                    setTimeout(function () { self.computerChoosesStrategy() }, 300);
                }

                else {
                    console.log("L'ordinateur à joué !")
                    box.innerHTML = "O"
                    box.style.color = "#e67e22"
                    this.checkWinner()
                }
            }
        },

        computerChoosesStrategy: function () {
            if (this.completeOrBreakARow("O")) {

            }

            else if (this.completeOrBreakARow("X")) {

            }

            else { this.randomChoice() };
        },

        completeOrBreakARow: function (symbol) {
            for (let i = 0; i < 24; i += 3) {

                for (let j = 0; j < 3; j++) {

                    for (let k = 0; k < 3; k++) {

                        if (j != k &&
                            this.gridBoxes.item(this.possiblities[i + j]).innerHTML == symbol &&
                            this.gridBoxes.item(this.possiblities[i + k]).innerHTML == symbol) {

                            for (let l = 0; l < 3; l++) {

                                if (l != j && l != k &&
                                    this.gridBoxes.item(this.possiblities[i + l]).innerHTML == '') {

                                    this.drawTheSymbolInTheBox(this.gridBoxes.item(this.possiblities[i + l], "computer"));

                                    return true

                                }
                            }

                        }
                    }
                }
            }
        },

        randomChoice: function () {

            let findABoxEmpty = false;

            while (findABoxEmpty == false) {

                if (this.countBoxEmpty()) {

                    let random = this.getRandomInteger();

                    if (this.gridBoxes.item(random).innerHTML == '') {
                        this.drawTheSymbolInTheBox(this.gridBoxes.item(random, "computer"));
                        findABoxEmpty = true;

                    }

                } else {

                    findABoxEmpty = true;

                }

            }
        },

        checkWinner: function () {

            for (let i = 0; i < 24; i += 3) {

                if (this.checkRow(i, "X")) {

                    this.message = "WIN !"
                    this.gameOver = true

                } else if (this.checkRow(i, "O")) {

                    this.message = "LOST !"
                    this.gameOver = true

                } else if (!this.countBoxEmpty()) {

                    this.message = "DRAW !"
                    this.gameOver = true

                }

            }
        },

        checkRow: function (i, symbol) {

            if (this.gridBoxes.item(this.possiblities[i]).innerHTML == symbol &&
                this.gridBoxes.item(this.possiblities[i + 1]).innerHTML == symbol &&
                this.gridBoxes.item(this.possiblities[i + 2]).innerHTML == symbol) {

                return true

            } else {

                return false

            }
        },

        countBoxEmpty: function () {
            let occurencies = 0;

            for (let i = 0; i < 9; i++) {

                if (this.gridBoxes.item(i).innerHTML == '') {

                    occurencies++;

                }
            }

            return occurencies;
        },

        getRandomInteger: function () {
            return Math.floor(Math.random() * Math.floor(9));
        },

        restart: function () {
            window.location.reload()
        }

    }
})

let dataOfTheFooter = new Vue({
    el: 'footer',
    data: {
        github: 'Venez voir mon Github !',
        linkedIn: 'Contactez moi sur LinkedIn !',
        portfolio: 'Venez sur mon portfolio !',
        vueJS: 'Application codée avec Vue.JS !'
    }
})