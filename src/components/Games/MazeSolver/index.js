import React from "react";

const MazeSolver = () => {
    return (
        <div>
            Maze
            <div id="maze__maze">
                <p>Find the way out of Maze in 30 seconds!</p>
                <div id="maze__c"></div>

                <canvas id="maze__canvas" width="523" height="523">
                    This text is displayed if your browser does not support
                    HTML5 Canvas.
                </canvas>
                <div id="maze__timerel"></div>
            </div>
            <div id="maze__myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2 className="gamehead"></h2>
                    </div>
                    <div className="modal-footer">
                        <h2 id="maze__demo">Play Again?</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MazeSolver;
