
 
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = path.join(__dirname, 'tasks.txt');
// Function to add a new task
function addTask(task) {
    fs.appendFile(dataFilePath, task + '\n', (err) => {
        if (err) {
            console.error('Error adding task:', err);
        } else {
            console.log('Task added successfully.');
        }
    });
}

// Function to view a list of tasks
function viewTasks() {
    const rl = readline.createInterface({
        input: fs.createReadStream(dataFilePath),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        console.log(line);
    });
}

// Function to mark a task as complete
function markTaskComplete(taskNumber) {
    let tasks = fs.readFileSync(dataFilePath, 'utf8').split('\n');
    if (taskNumber >= 0 && taskNumber < tasks.length) {
        tasks[taskNumber] = '[X] ' + tasks[taskNumber];
        fs.writeFileSync(dataFilePath, tasks.join('\n'));
        console.log('Task marked as complete.');
    } else {
        console.error('Invalid task number.');
    }
}
// Function to remove a task
function removeTask(taskNumber) {
    let tasks = fs.readFileSync(dataFilePath, 'utf8').split('\n');
    if (taskNumber >= 0 && taskNumber < tasks.length) {
        tasks.splice(taskNumber, 1);
        fs.writeFileSync(dataFilePath, tasks.join('\n'));
        console.log('Task removed successfully.');
    } else {
        console.error('Invalid task number.');
    }
}

