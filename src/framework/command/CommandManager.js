
export default class CommandManager {
    executed   = [];
    unexecuted = [];
  
    constructor(){}
  
    execute(cmd) {
      cmd.execute();
      this.executed.push(cmd);
    }
  
    undo() {
      if( this.canUndo() ) {
        var cmd1 = this.executed.pop();     // вытягиваем из выполненых команд последнюю
            
        if (cmd1.unexecute !== undefined){  // если у нее есть функция отмены
          cmd1.unexecute();                 // выполнить ее
        }
        this.unexecuted.push(cmd1);         // и поместить ее в масив отмененных команд
      }
    }
    canUndo(){
      return this.executed.length > 0
    }
    redo() {
  
      if( this.canRedo() ) {
          var cmd2 = this.unexecuted.pop(); // достаем последнюю отмененныю комаду
          cmd2.execute();                   // выполним ее
          this.executed.push(cmd2);         // и поестим обратно в выполненые
      }
  
    }
    canRedo(){
      return this.unexecuted.length > 0
    }
  };




  