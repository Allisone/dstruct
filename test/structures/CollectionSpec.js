(function(){

    function spec(factory, name) {
        describe(name, function () {
            var collection;

            beforeEach(function () {
                collection = factory();
            });

            it("Should add one number and contain it as the only element.", function () {
                collection.add(42);

                expect(collection.get(0)).toBe(42);
                expect(collection.size()).toBe(1);
            });

            it("Should add multiple numbers and retain expected order.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(1997);
                collection.add(18405);

                expect(collection.get(0)).toBe(4);
                expect(collection.get(1)).toBe(42);
                expect(collection.get(2)).toBe(44);
                expect(collection.get(3)).toBe(1997);
                expect(collection.get(4)).toBe(18405);
                expect(collection.size()).toBe(5);
            });

            it("Should add multiple numbers and clear them.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.clear();

                expect(collection.size()).toBe(0);
                expect(collection.isEmpty()).toBe(true);
            });

            // .has()

            // TODO: add cases for unique, versus non unique.?

            it("Should find an element at the beginning of a collection that contains multiple elements.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(1997);

                expect(collection.has(4)).toBe(true);
            });

            it("Should find an element at the end of a collection that contains multiple elements.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(1997);

                expect(collection.has(1997)).toBe(true);
            });

            it("Should find an element not at the end or beginning of a collection that contains multiple elements.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(44);
                collection.add(47);
                collection.add(1997);

                expect(collection.has(47)).toBe(true);
            });

            // TODO: begin, end, and n case for the not existence?
            it("Should not find in a collection with multiple elements when that element does not exist.", function () {
                collection.add(42);
                collection.add(44);
                collection.add(34384937859);

                expect(collection.has(1814)).toBe(false);
            });

            // END: .has()

            // .remove()

            it("Should remove a unique element not at the end or beginning of a collection with multiple elements.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(47);
                collection.add(1997);

                expect(collection.remove(44)).toBe(true);
                expect(collection.has(44)).toBe(false);
                expect(collection.size()).toBe(4);
            });

            it("Should remove a unique element at the beginning of a collection with multiple elements.", function () {
                collection.add(4);
                collection.add(590678);
                collection.add(44594580473);
                collection.add(48768);
                collection.add(80495890);

                expect(collection.remove(4)).toBe(true);
                expect(collection.has(4)).toBe(false);
                expect(collection.size()).toBe(4);
            });

            it("Should remove the only element(number) that exists in the collection", function() {
                collection.add(24);

                expect(collection.remove(24)).toBe(true);
                expect(collection.size()).toBe(0);
            });

            it("Should remove the only element(string) that exists in the collection", function() {
                collection.add("jibb");

                expect(collection.remove("jibb")).toBe(true);
                expect(collection.size()).toBe(0);
            });

            it("Should remove the last element of the collection with multiple elements inside", function() {
                collection.add(2335);
                collection.add(2854689);
                collection.add(0);

                expect(collection.size()).toBe(3);
                expect(collection.remove(0)).toBe(true);
                expect(collection.size()).toBe(2);
            });

            /*
            TODO: this causes the tests to hang. figure out why.
            it("Should remove a unique element at the end of a collection with multiple elements.", function () {
                collection.add(4);
                collection.add(590678);
                collection.add(44473);
                collection.add(495768);
                collection.add(80495890);

                expect(collection.remove(80495890)).toBe(true);
                expect(collection.has(80495890)).toBe(false);
                expect(collection.size()).toBe(4);
            });
            */

            // END: .remove()
        });
    }

    define([
        "structures/lists/ArrayList",
        "structures/lists/DoublyLinkedList"], function (
        ArrayList,
        DoublyLinkedList) {

        describe("Collection", function () {

            spec(function () {
                return new ArrayList();
            }, "ArrayList");

            spec(function () {
                return new DoublyLinkedList();
            }, "DoublyLinkedList");

            // TODO: add rest of collections

        });

    });

})();
