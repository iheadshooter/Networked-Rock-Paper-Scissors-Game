class RPS {
    constructor(p1, p2) {
        this._players = [p1, p2];
        this._turns = [null, null];
        this._items = ["Rock", "Paper", "Scissors"];
        this._sendToPlayers("Rock Paper Scissors Starts");
        this._players.forEach((player, idx) => {
            player.on("turn", (turn) => {
                this._onTurn(turn, idx);
            });
        });
    }
    
    _sendToPlayers(msg) {
        this._players.forEach((player, idx) => {
            this._sendToPlayer(msg, idx);
        });
    }

    _sendToPlayer(msg, idx) {
        this._players[idx].emit("msg", msg);
    }

    _onTurn(turn, idx) {
        this._sendToPlayer(`You Selected ${this._items[turn]}`, idx);
        this._turns[idx] = turn;
        this._checkGameOver();
    }

    _checkGameOver() {
        if (this._turns[0] != null && this._turns[1] != null) {
            this._sendToPlayers(this._items[this._turns[0]] + " : " + this._items[this._turns[1]]);
            if ((this._turns[0] + 1) % 3 == this._turns[1]) {
                this._sendToPlayer("You Won this Round", 1);
                this._sendToPlayer("You Lose this Round", 0);
            } else if ((this._turns[1] + 1) % 3 == this._turns[0]) {
                this._sendToPlayer("You Won this Round", 0);
                this._sendToPlayer("You Lose this Round", 1);
            } else {
                this._sendToPlayers("Round Drawn");
            }
            this._sendToPlayers("Next Round Starts");
            this._turns = [null, null];
        }
    }

}

module.exports = RPS;