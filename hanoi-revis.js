
// *** Node() and Stack() implementation in Javascript ***

function Node(val) {
  this.val = val;
  this.next = null;
}

function Stack() {
  this.head = null;
  this._length = 0;

  this.push = function(val) {
    var node = new Node(val);

    if(!this.head) {
      this.head = node;
      this._length++;
    } else {
      node.next = this.head;
      this.head = node;
      this._length++;
    }
  };

  this.pop = function() {
    if(this._length === 0) {
      return null;
    } else if (this._length === 1) {
      var node = this.head;
      this.head = null;
      this._length = 0;
      return node;
    }
    var node = this.head;
    node.next = this.head.next;
    this.head = node;
    this._length--;
    return node;
  };
}

// *** Tower constructor ***

function Tower(index) {
  this.disks = new Stack();
  this.index = index;

  this.add = function(activeDisk) {
    this.disks.push(activeDisk);
  };

  this.moveTopTo = function(curTower, desTower) {
    var top = curTower.disks.pop();
    desTower.add(top);
    console.log('move disk ' + top.val + ' from tower ' + curTower.index + ' to tower ' + desTower.index);
  };

  this.moveDisks = function(n, tDest, tBuff) {
    if (n > 0) {
      this.moveDisks(n - 1, tBuff, tDest);
      this.moveTopTo(this, tDest);
      tBuff.moveDisks(n-1, tDest, this);
    }
  };
}

// *** Main function ***

(function() {
  var n = 3;
  var towers = [];
  for(var i = 0; i < 3; i ++) {
    towers[i] = new Tower(i);
  }

  for(var i = n; i > 0; i--) {
    towers[0].add(i);
  }

  towers[0].moveDisks(n, towers[2], towers[1]);
})();
