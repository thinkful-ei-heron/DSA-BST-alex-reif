const BinarySearchTree = require("./bst");

function display(tree) {
  if (!tree) {
    return;
  }
  console.log(tree.value);
  display(tree.left);
  display(tree.right);
}

function main() {
  let BST = new BinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);
  // display(BST);

  let BSTtwo = new BinarySearchTree();
  BSTtwo.insert("E", "E");
  BSTtwo.insert("A", "A");
  BSTtwo.insert("S", "S");
  BSTtwo.insert("Y", "Y");
  BSTtwo.insert("Q", "Q");
  BSTtwo.insert("U", "U");
  BSTtwo.insert("E", "E");
  BSTtwo.insert("S", "S");
  BSTtwo.insert("T", "T");
  BSTtwo.insert("I", "I");
  BSTtwo.insert("O", "O");
  BSTtwo.insert("N", "N");

  let BSTthree = new BinarySearchTree();
  BSTthree.insert("E", "E");
  BSTthree.insert("A", "A");
  BSTthree.insert("S", "S");
  BSTthree.insert("Y", "Y");
  BSTthree.insert("1", "1");
  BSTthree.insert("2", "2");
  BSTthree.insert("3", "3");

  const bstHeight = (tree, height = 1) => {
    if (tree.right == null && tree.left == null) {
      return height;
    }
    if (tree.right && tree.left) {
      return Math.max(
        bstHeight(tree.right, height + 1),
        bstHeight(tree.left, height + 1)
      );
    } else if (tree.left !== null) {
      return bstHeight(tree.left, height + 1);
    } else if (tree.right !== null) {
      return bstHeight(tree.right, height + 1);
    }
    return height;
  };
  // console.log(bstHeight(BSTthree));

  const isItABST = tree => {
    if (tree.right && tree.left) {
      if (tree.left.key < tree.key || tree.right.key > tree.key) {
        isItABST(tree.right);
        isItABST(tree.left);
      } else return false;
    } else if (tree.left !== null) {
      isItABST(tree.left);
    } else if (tree.right !== null) {
      isItABST(tree.right);
    }
    return true;
  };
  // console.log(isItABST(BST));

  function recursiveGrab(tree, array = []) {
    if (tree.left == null && tree.right == null) {
      return array;
    }
    if (tree.left && tree.right) {
      array.push(tree.left.value, tree.right.value);
      recursiveGrab(tree.left, array);
      recursiveGrab(tree.right, array);
    } else {
      if (tree.left) {
        array.push(tree.left.value);
        recursiveGrab(tree.left, array);
      } else if (tree.right) {
        array.push(tree.right.value);
        recursiveGrab(tree.right, array);
      }
    }
    if (typeof (array[0] === "string")) {
      return array.sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      )[array.length - 3];
    } else {
      // if array > 10 items O(LogN)
      return array.sort((a, b) => a - b)[array.length - 3];
    }
  }
  // console.log(recursiveGrab(BSTtwo));

  function balanced(tree, height = 1, highest = 0) {
    let output = true;
    if (height >= highest) highest = height;
    if (tree.right == null && tree.left == null) return height;
    if (tree.right && tree.left) {
      let aSide = balanced(tree.right, height + 1, highest);
      let bSide = balanced(tree.left, height + 1, highest);
      let currHighest = Math.max(aSide, bSide);
      if (
        aSide > bSide + 1 ||
        aSide < bSide - 1 ||
        currHighest > height + 2 ||
        currHighest < height - 2
      ) {
        output = false;
        return output;
      }
    } else if (tree.left !== null) {
      return balanced(tree.left, height + 1, highest);
    } else if (tree.right !== null) {
      return balanced(tree.right, height + 1, highest);
    }
    return output;
  }
  // console.log("BST: " + balanced(BST));
  // console.log("BSTtwo: " + balanced(BSTtwo));

  compareTwoRecursive = (arr1, arr2) => {
    let nextRight1;
    let nextLeft1;
    let nextRight2;
    let nextLeft2;
    if (arr1[0] !== arr2[0]) {
      return false;
    }
    nextRight1 = arr1.find(item => item > arr1[0]);
    nextLeft1 = arr1.find(item => item < arr1[0]);
    nextRight2 = arr2.find(item => item > arr2[0]);
    nextLeft2 = arr2.find(item => item < arr2[0]);
    if (nextRight1 !== undefined) {
      if (nextRight1 === nextRight2 && nextLeft1 === nextLeft2) {
        compareTwoRecursive(arr1.slice(1), arr2.slice(1));
        return true;
      } else return false;
    }
  };
  // console.log(
  //   compareTwoRecursive([3, 1, 0, 2, 5, 4, 6], [3, 5, 6, 4, 1, 0, 2])
  // );
}
main();
