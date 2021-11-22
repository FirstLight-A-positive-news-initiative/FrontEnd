import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./styles.css";
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from "react-icons/ai";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MazeSolver = (props) => {
    //var now = new Date().getTime();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState(
        "Oops! Looks like you are out of time"
    );
    const history = props.history;

    useEffect(() => {
        var playing,
            temp,
            m,
            i,
            j,
            x,
            cord,
            modelfunwin;

        // modelfungo = () => {
        //     setIsModalOpen(() => true);
        //     setModalText(() => "Oops! Looks like you are out of time");
        // };

        modelfunwin = () => {
            setIsModalOpen(() => true);
            setModalText(() => "Congratulations you have won the game!");
        };

        // function startTimer(duration, display) {
        //     var start = Date.now(),
        //         diff,
        //         minutes,
        //         seconds;
        //     function timer() {
        //         if (playing) {
        //             diff = duration - (((Date.now() - start) / 1000) | 0);
        //             minutes = (diff / 60) | 0;
        //             seconds = diff % 60 | 0;
        //             minutes = minutes < 10 ? "0" + minutes : minutes;
        //             seconds = seconds < 10 ? "0" + seconds : seconds;
        //             display.textContent =
        //                 "Game ends in " + minutes + ":" + seconds;

        //             if (diff <= 0) {
        //                 display.textContent = "Game Over";
        //                 start = Date.now() + 1000;
        //                 playing = false;
        //                 modelfungo();
        //             }
        //         }
        //     }
        //     timer();
        //     setInterval(timer, 1000);
        // }
        // twominutes = 30;
        x = document.querySelector("#timerel");
        // startTimer(twominutes, x);

        playing = true;
        window.addEventListener("keydown", doKeyDown, true);

        function doKeyDown(evt) {
            var handled = false;
            if (playing) {
                switch (evt.keyCode) {
                    case 38 /* Up arrow was pressed */:
                        m.moveup("canvas");
                        handled = true;
                        break;
                    case 87 /* Up arrow was pressed */:
                        m.moveup("canvas");
                        handled = true;
                        break;
                    case 40 /* Down arrow was pressed */:
                        m.movedown("canvas");
                        handled = true;
                        break;
                    case 83 /* Down arrow was pressed */:
                        m.movedown("canvas");
                        handled = true;
                        break;
                    case 37 /* Left arrow was pressed */:
                        m.moveleft("canvas");
                        handled = true;
                        break;
                    case 65 /* Left arrow was pressed */:
                        m.moveleft("canvas");
                        handled = true;
                        break;
                    case 39 /* Right arrow was pressed */:
                        m.moveright("canvas");
                        handled = true;
                        break;
                    case 68 /* Right arrow was pressed */:
                        m.moveright("canvas");
                        handled = true;
                        break;
                    default:
                        break;
                }
                if (m.checker("canvas")) playing = false;
            }
            if (handled) evt.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
        }
        var dsd = function (size) {
            this.N = size;
            this.P = new Array(this.N);
            this.R = new Array(this.N);

            this.init = function () {
                for (var i = 0; i < this.N; i++) {
                    this.P[i] = i;
                    this.R[i] = 0;
                }
            };

            this.union = function (x, y) {
                var u = this.find(x);
                var v = this.find(y);
                if (this.R[u] > this.R[v]) {
                    this.R[u] = this.R[v] + 1;
                    this.P[u] = v;
                } else {
                    this.R[v] = this.R[u] + 1;
                    this.P[v] = u;
                }
            };

            this.find = function (x) {
                if (x === this.P[x]) return x;
                this.P[x] = this.find(this.P[x]);
                return this.P[x];
            };
        };

        function random(min, max) {
            return min + Math.random() * (max - min);
        }
        function randomChoice(choices) {
            return choices[Math.round(random(0, choices.length - 1))];
        }

        var maze = function (X, Y) {
            this.N = X;
            this.M = Y;
            this.S = 25;
            this.moves = 0;
            this.Board = new Array(2 * this.N + 1);
            this.visited = new Array(2 * this.N + 1);
            this.EL = [];
            this.vis = new Array(2 * this.N + 1);
            this.delay = 2;
            this.x = 1;
            this.init = function () {
                for (let i = 0; i < 2 * this.N + 1; i++) {
                    this.Board[i] = new Array(2 * this.M + 1);
                    this.visited[i] = new Array(2 * this.N + 1);
                    this.vis[i] = new Array(2 * this.M + 1);
                }

                for (let i = 0; i < 2 * this.N + 1; i++) {
                    for (var j = 0; j < 2 * this.M + 1; j++) {
                        if (!(i % 2) && !(j % 2)) {
                            this.Board[i][j] = "+";
                        } else if (!(i % 2)) {
                            this.Board[i][j] = "-";
                        } else if (!(j % 2)) {
                            this.Board[i][j] = "|";
                        } else {
                            this.Board[i][j] = " ";
                        }
                        this.vis[i][j] = 0;
                    }
                }
            };

            this.add_edges = function () {
                for (var i = 0; i < this.N; i++) {
                    for (var j = 0; j < this.M; j++) {
                        if (i !== this.N - 1) {
                            this.EL.push([[i, j], [i + 1, j], 1]);
                        }
                        if (j !== this.M - 1) {
                            this.EL.push([[i, j], [i, j + 1], 1]);
                        }
                    }
                }
            };

            //Hash function
            this.h = function (e) {
                return e[1] * this.M + e[0];
            };
            this.randomize = function (EL) {
                for (var i = 0; i < EL.length; i++) {
                    var si = Math.floor(Math.random() * 387) % EL.length;
                    var tmp = EL[si];
                    EL[si] = EL[i];
                    EL[i] = tmp;
                }
                return EL;
            };

            this.breakwall = function (e) {
                var x = e[0][0] + e[1][0] + 1;
                var y = e[0][1] + e[1][1] + 1;
                this.Board[x][y] = " ";
            };

            this.gen_maze = function () {
                this.EL = this.randomize(this.EL);
                var D = new dsd(this.M * this.M);
                D.init();
                var s = this.h([0, 0]);
                var e = this.h([this.N - 1, this.M - 1]);
                this.Board[1][0] = " ";
                this.Board[2 * this.N - 1][2 * this.M] = " ";
                //Run Kruskal
                for (var i = 0; i < this.EL.length; i++) {
                    var x = this.h(this.EL[i][0]);
                    var y = this.h(this.EL[i][1]);
                    if (D.find(s) === D.find(e)) {
                        if (
                            !(
                                D.find(x) === D.find(s) &&
                                D.find(y) === D.find(s)
                            )
                        ) {
                            if (D.find(x) !== D.find(y)) {
                                D.union(x, y);
                                this.breakwall(this.EL[i]);
                                this.EL[i][2] = 0;
                            }
                        }
                        //break;
                    } else if (D.find(x) !== D.find(y)) {
                        D.union(x, y);
                        this.breakwall(this.EL[i]);
                        this.EL[i][2] = 0;
                    } else {
                        continue;
                    }
                }
            };

            this.draw_canvas = function (id) {
                this.canvas = document.getElementById("canvas");
                var scale = this.S;
                temp = [];
                if (this.canvas.getContext) {
                    this.ctx = this.canvas.getContext("2d");
                    this.Board[1][0] = "$";
                    for (var i = 0; i < 2 * this.N + 1; i++) {
                        for (var j = 0; j < 2 * this.M + 1; j++) {
                            if (this.Board[i][j] !== " ") {
                                //} && this.Board[i][j] !== '&') {
                                this.ctx.fillStyle = "#000000"; // color of maze border
                                this.ctx.fillRect(
                                    scale * i,
                                    scale * j,
                                    scale,
                                    scale
                                );
                            } else if (i < 5 && j < 5) temp.push([i, j]);
                        }
                    }
                    x = randomChoice(temp);
                    this.Board[x[0]][x[1]] = "&";
                    this.ctx.fillStyle = "#39FF14"; // color of moving dot
                    this.ctx.fillRect(scale * x[0], scale * x[1], scale, scale);
                }
            };

            this.checkPos = function (id) {
                for (var i = 0; i < 2 * this.N + 1; i++) {
                    for (var j = 0; j < 2 * this.M + 1; j++) {
                        if (this.Board[i][j] === "&") {
                            // console.log(i,j)
                            return [i, j];
                        }
                    }
                }
            };

            this.moveclear = function (a, b) {
                var scale = this.S;
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = "#288803"; // color of trace
                this.ctx.fillRect(scale * a, scale * b, scale, scale);
                this.Board[a][b] = " ";
            };

            this.move = function (a, b) {
                var scale = this.S;
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = "#39FF14"; // color of dot
                this.ctx.fillRect(scale * a, scale * b, scale, scale);
                this.Board[a][b] = "&";
            };

            this.moveup = function (id) {
                cord = this.checkPos(id);
                // var scale = this.S;
                i = cord[0];
                j = cord[1];
                j -= 1;
                if (j < 0) return;
                else if (j > 2 * this.M) return;
                else if (this.Board[i][j] === " ") {
                    this.moveclear(i, j + 1);
                    this.move(i, j);
                    this.moves += 1;
                } else return;
            };

            this.movedown = function (id) {
                cord = this.checkPos(id);
                // var scale = this.S;
                i = cord[0];
                j = cord[1];
                j += 1;
                if (j < 0) return;
                else if (j > 2 * this.M) return;
                else if (this.Board[i][j] === " ") {
                    this.moveclear(i, j - 1);
                    this.move(i, j);
                    this.moves += 1;
                } else return;
            };

            this.moveleft = function (id) {
                cord = this.checkPos(id);
                // var scale = this.S;
                i = cord[0];
                j = cord[1];
                i -= 1;
                if (i < 0) return;
                else if (i > 2 * this.N) return;
                else if (this.Board[i][j] === " ") {
                    this.moveclear(i + 1, j);
                    this.move(i, j);
                    this.moves += 1;
                } else return;
            };

            this.moveright = function (id) {
                cord = this.checkPos(id);
                // var scale = this.S;
                i = cord[0];
                j = cord[1];
                i += 1;
                if (i < 0) return;
                else if (i > 2 * this.N) return;
                else if (this.Board[i][j] === " ") {
                    this.moveclear(i - 1, j);
                    this.move(i, j);
                    this.moves += 1;
                } else return;
            };
            this.checker = function (id) {
                //      console.log("win");
                cord = this.checkPos(id);
                i = cord[0];
                j = cord[1];
                //    console.log(cord)
                if ((i === 19 && j === 20) || (i === 1 && j === 0)) {
                    modelfunwin();
                    //           alert("YOU WIN, CONGRATULATIONS!");
                    //
                    return 1;
                }
                return 0;
            };

            this.getMoves = function () {
                return this.moves;
            };

            this.dfs = function (x, y, orgx, orgy) {
                if (x > 20 || y > 20 || x < 1 || y < 1 || this.visited[x][y])
                    return false;
                this.visited[x][y] = true;
                if (x===20 && y===20) {
                    var scale = this.S;
                    this.ctx = this.canvas.getContext("2d");
                    if (x!==orgx || y!==orgy) this.ctx.fillStyle = "#FF0000"; // color of dot
                    return true;
                }
                if (this.Board[x][y]===" " || this.Board[x][y]==="&") {
                    scale = this.S;
                    this.ctx = this.canvas.getContext("2d");
                    console.log(x, y);
                    if (x!==orgx || y!==orgy) this.ctx.fillStyle = "#FBFF00"; // color of dot
                    this.ctx.fillRect(scale * x, scale * y, scale, scale);
                    if (x===20 && y===20) return true;
                    if (this.dfs(x + 1, y, orgx, orgy)) {
                        this.ctx.fillStyle = "#FF0000"; // color of dot
                        if (x!==orgx || y!==orgy)
                            this.ctx.fillRect(
                                scale * x,
                                scale * y,
                                scale,
                                scale
                            );
                        return true;
                    }
                    if (this.dfs(x, y + 1, orgx, orgy)) {
                        this.ctx.fillStyle = "#FF0000"; // color of dot
                        if (x!==orgx || y!==orgy)
                            this.ctx.fillRect(
                                scale * x,
                                scale * y,
                                scale,
                                scale
                            );
                        return true;
                    }
                    if (this.dfs(x - 1, y, orgx, orgy)) {
                        this.ctx.fillStyle = "#FF0000"; // color of dot
                        if (x!==orgx || y!==orgy)
                            this.ctx.fillRect(
                                scale * x,
                                scale * y,
                                scale,
                                scale
                            );
                        return true;
                    }
                    if (this.dfs(x, y - 1, orgx, orgy)) {
                        this.ctx.fillStyle = "#FF0000"; // color of dot
                        if (x!==orgx || y!==orgy)
                            this.ctx.fillRect(
                                scale * x,
                                scale * y,
                                scale,
                                scale
                            );
                        return true;
                    }
                    return false;
                }
                return false;
            };

            this.solve_ai = function () {
                cord = this.checkPos("canvas");
                for (var i = 0; i < this.visited.length; i++) {
                    for (var j = 0; j < this.visited[0].length; j++) {
                        this.visited[i][j] = false;
                    }
                }
                this.dfs(cord[0], cord[1], cord[0], cord[1]);
                this.Board[cord[0]][cord[1]] = "&";
            };
        };

        m = new maze(10, 10);
        m.init();
        m.add_edges();
        m.gen_maze();
        m.draw_canvas("canvas");
        document
            .getElementById("mobile_move-up")
            .addEventListener("click", () => {
                doKeyDown({
                    keyCode: 38,
                    preventDefault: () => {},
                });
            });
        document
            .getElementById("mobile_move-left")
            .addEventListener("click", () => {
                doKeyDown({
                    keyCode: 37,
                    preventDefault: () => {},
                });
            });
        document
            .getElementById("mobile_move-right")
            .addEventListener("click", () => {
                doKeyDown({
                    keyCode: 39,
                    preventDefault: () => {},
                });
            });
        document
            .getElementById("mobile_move-down")
            .addEventListener("click", () => {
                doKeyDown({
                    keyCode: 40,
                    preventDefault: () => {},
                });
            });
        document.getElementById("maze-solve").addEventListener("click", () => {
            m.solve_ai();
        });
    }, []);
    // drawMoves();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <div id="maze">
                <h1>Maze</h1>
                <p>Find the way out of Maze in 30 seconds!</p>
                <canvas id="canvas" width="523" height="523">
                    This text is displayed if your browser does not support
                    HTML5 Canvas.
                </canvas>
                <div id="timerel"></div>
                <div className="maze__mobile-controls">
                    <div className="maze__mobile-controls-up">
                        <button id="mobile_move-up">
                            <AiOutlineArrowUp />
                        </button>
                    </div>
                    <div className="maze__mobile-controls-side">
                        <button id="mobile_move-left">
                            <AiOutlineArrowLeft />
                        </button>
                        <button id="mobile_move-right">
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                    <div className="maze__mobile-controls-down">
                        <button id="mobile_move-down">
                            <AiOutlineArrowDown />
                        </button>
                    </div>
                </div>
                <div className="maze-buttons">
                    <Button className="maze__button maze-solve" id="maze-solve">
                        SOLVE USING AI
                    </Button>
                    <Button
                        className="maze__button maze-play-again"
                        onClick={() => {
                            history.push("/news");
                            history.goBack();
                        }}
                    >
                        NEW GAME
                    </Button>
                </div>
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(() => false)}
                    className="maze__modal"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            {modalText}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Try again?{" "}
                            <Button
                                className="maze__button"
                                onClick={() => {
                                    history.push("/news");
                                    history.goBack();
                                }}
                            >
                                NEW GAME
                            </Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default withRouter(MazeSolver);
