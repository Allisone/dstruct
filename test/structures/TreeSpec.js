(function () {

    function treeSpec(treeFactory, name) {
        describe(name, function () {
            var tree;

            beforeEach(function () {
                tree = treeFactory();
            });


            it("Should find a key and value after inserted once.", function () {
                tree.insert(4, 2);

                expect(tree.get(4) === 2);
                expect(tree.size() === 1);
            });

            it("Should find a key and value after same key is inserted multiple times.", function () {
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 4);

                expect(tree.get(4) === 4);
                expect(tree.size() === 1);
            });

            it("Should remove a key inserted.", function () {
                tree.insert(4, 2);
                tree.insert(2, 2);
                tree.insert(4, 4);
                tree.remove(4);

                expect(tree.get(4) === null);
                expect(tree.size() === 1);
            });

            it("Should forEach over inserted elements", function () {
                tree.insert(4, 2);
                tree.forEach(function(key, value) {
                    expect(key).toBe(4);
                    expect(value).toBe(2);
                });

                expect(tree.size() === 1);
            });

            //currently fails -- error: NullPointerException -argument is null
            it("isEmpty() should return false, even if all values inserted into the tree are null", function () {
                tree.insert(1, null);
                tree.insert(2, null);
                tree.insert(3, null);

                expect(tree.isEmpty() === false);
                expect(tree.size() === 3);
            });

            //currently fails -- error: NullPointerException -argument is null
            it("isEmpty() should return false, even if all values inserted into the tree are undefined", function() {
                tree.insert(1, undefined);
                tree.insert(2, undefined);
                tree.insert(3, undefined);

                expect(tree.isEmpty() === false);
                expect(tree.size() === 3);
            });

            it("isEmpty() should return false, even if all values inserted into keys are 0 or negatives", function() {
                tree.insert(1, 0);
                tree.insert(2, -1);
                tree.insert(3, 0);

                expect(tree.isEmpty() === false);
                expect(tree.size() === 3);
            });

            it("clear() should remove all items in a tree with multiple items", function () {
                tree.insert(1, 5);
                tree.insert(2, 8);
                tree.insert(3, 0);

                tree.clear();

                expect(tree.isEmpty() === true);
                expect(tree.size() === 0);
            });

            it("clear() should remove all items in a tree with multiple items", function () {
                tree.insert(1, 5);
                tree.insert(2, 8);
                tree.insert(3, 0);

                tree.clear();

                expect(tree.isEmpty() === true);
                expect(tree.size() === 0);
            });

        });
    }

    define(["structures/trees/RedBlackTree"], function (RedBlackTree) {

        describe("Trees", function () {

            treeSpec(function () {
                return new RedBlackTree();
            }, "RedBlackTree");

        });

    });

})
();
