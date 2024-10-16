const { exec } = require('child_process');

function convertJsonToPdd(jsonData){
    const grid = jsonData.testIn.split("\n");
    let pddlProblem = "(define (problem Sokoban-Level)\n";
    pddlProblem += "    (:domain Sokoban)\n (:objects\n";

    let tiles = [];
    let playerPos = null;
    let boxes = [];
    let goals = [];
    const width = grid[0].length;
    const height = grid.length;

    //Parcours de la grille pour identifier les éléments
    for(let y = 0; y<grid.length;y++){
        for(let x = 0; x<grid[y].length; x++){
            const char = grid[x][y];
            const tile = `t${x}_${y}`;
            if(char !== '#'){ //on ignore les murs, n'étant pas des endroits atteignables
                tiles.push(tile);
                if(char === '@'){
                    playerpos = tile;
                } else if (char === '$'){
                    boxes.push(tile);
                } else if (char === '.'){
                    goals.push(tile);
                } else if (char === '*') {
                    boxes.push(tile);
                    goals.push(tile);
                }
            }
        }
    }

    //Ajout des objets au problème

    pddlProblem += tiles.join(" ") + " - tile\n p - player\n";
    pddlProblem += boxes.map((_,i) => `b${i}`).join(" ") + " - box\n";
    pddlProblem += "    )\n";

    //Ajout de l'état initial 
    pddlProblem += "    (:init\n";
    if(playerPos){
        pddlProblem+= ` (playerAt ${playerPos})\n`;
    }
    boxes.forEach((box, i) => {
    pddlProblem += `    (boxAt ${box})\n`;
    });
    tiles.forEach(tile =>{
        if(!boxes.includes(tile) && tile !== playerPos){
            pddlProblem += `    (isEmpty ${tile})\n`;
        }
    });
    pddlProblem += "    )\n";

    //Ajout des relations spatiales 
    for(let y = 0; y<height;y++){
        for(let x =0; x<width;x++){
            const tile = `t${x}_${y}`;
            if (grid[y][x] !== '#'){ //on ne se préoccupe que des tuiles qui ne sont pas des murs
                //On vérifie la tuile du dessous
                if(grid[y+1][x]!=='#'){ //si ce n'est pas un mur
                    const downTile = `t${x}_{y+1}`;
                    pddlProblem += `    (isUp ${tile} ${downTile})`;
                    pddlProblem += `    (idDown ${downTile} ${tile})`;
                } //on ajoute les prédicats de positions verticales

                //On vérifie la tuile de droite
                if(grid[y][x+1]!=='#'){ //si ce n'est pas un mur
                    const rightTile = `t${x}_{y+1}`;
                    pddlProblem += `    (isLeft ${tile} ${rightTile})`;
                    pddlProblem += `    (isRight ${rightTile} ${tile})`;
                } //on ajoute les prédicats de positions verticales

            }
        }
    }
    pddlProblem += "    )\n";

    //Ajout des objectifs 
    pddlProblem += "    (:goal\n    (and\n";
    goals.forEach(goal => {
        pddlProblem += `    (boxAt ${goal})\n`;
    });
    pddlProblem += "    )\n )\n)";

    return pddlProblem;
}


function solveSokoban(jsonData, domainFile){
    const problemFile = 'problem.pddl';
    writeFile(problemFile, pddlProblem);
    plan = exec('java -cp build/libs/pddl4j-4.0.0.jar fr.uga.pddl4j.planners.statespace.FF Sokoban.pddl ' + problemFile)
    //const plan = runPddl4j(problemFile,domainFile);
    writeFile('solution.txt', plan);
    console.log('Solution trouvée et écrite dans solution.txt');
}
    


