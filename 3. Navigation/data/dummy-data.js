import Category from '../models/category';
import Meal from '../models/meal';

export const CATEGORIES = [
    new Category('c1', 'Italian', '#f5428d'),
    new Category('c2', 'Quick & Easy', '#f54242'),
    new Category('c3', 'Hamburgers', '#f5a442'),
    new Category('c4', 'German', '#f5d142'),
    new Category('c5', 'Light & Lovely', '#368dff'),
    new Category('c6', 'Exotic', '#41d95d'),
    new Category('c7', 'Breakfast', '#9eecff'),
    new Category('c8', 'Asian', '#b9ffb0'),
    new Category('c9', 'French', '#ffc7ff'),
    new Category('c10', 'Summer', '#47fced')
];

export const MEALS = [
    new Meal(
        'm1',
        ['c1', 'c2'],
        'Spaghetti with Tomato Sauce',
        'affordable',
        'simple',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
        20,
        [
            '4 Tomatoes',
            '1 Tablespoon of Olive Oil',
            '1 Onion',
            '250g Spaghetti',
            'Spices',
            'Cheese (optional)'
        ],
        [
            'Cut the tomatoes and the onion into small pieces.',
            'Boil some water - add salt to it once it boils.',
            'Put the spaghetti into the boiling water - they should be done in about 10 to 12 minutes.',
            'In the meantime, heaten up some olive oil and add the cut onion.',
            'After 2 minutes, add the tomato pieces, salt, pepper and your other spices.',
            'The sauce will be done once the spaghetti are.',
            'Feel free to add some cheese on top of the finished dish.'
        ],
        false,
        true,
        true,
        true
    ),

    new Meal(
        'm2',
        ['c2'],
        'Toast Hawaii',
        'affordable',
        'simple',
        'https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg',
        10,
        [
            '1 Slice White Bread',
            '1 Slice Ham',
            '1 Slice Pineapple',
            '1-2 Slices of Cheese',
            'Butter'
        ],
        [
            'Butter one side of the white bread',
            'Layer ham, the pineapple and cheese on the white bread',
            'Bake the toast for round about 10 minutes in the oven at 200°C'
        ],
        false,
        false,
        false,
        false
    ),

    new Meal(
        'm3',
        ['c3'],
        'Classic Hamburger',
        'pricey',
        'simple',
        'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg',
        45,
        [
            '300g Cattle Hack',
            '1 Tomato',
            '1 Cucumber',
            '1 Onion',
            'Ketchup',
            '2 Burger Buns'
        ],
        [
            'Form 2 patties',
            'Fry the patties for c. 4 minutes on each side',
            'Quickly fry the buns for c. 1 minute on each side',
            'Bruch buns with ketchup',
            'Serve burger with tomato, cucumber and onion'
        ],
        false,
        false,
        false,
        true
    ),

    new Meal(
        'm4',
        ['c4'],
        'Wiener Schnitzel',
        'luxurious',
        'challenging',
        'https://cdn.pixabay.com/photo/2018/03/31/19/29/schnitzel-3279045_1280.jpg',
        60,
        [
            '8 Veal Cutlets',
            '4 Eggs',
            '200g Bread Crumbs',
            '100g Flour',
            '300ml Butter',
            '100g Vegetable Oil',
            'Salt',
            'Lemon Slices'
        ],
        [
            'Tenderize the veal to about 2–4mm, and salt on both sides.',
            'On a flat plate, stir the eggs briefly with a fork.',
            'Lightly coat the cutlets in flour then dip into the egg, and finally, coat in breadcrumbs.',
            'Heat the butter and oil in a large pan (allow the fat to get very hot) and fry the schnitzels until golden brown on both sides.',
            'Make sure to toss the pan regularly so that the schnitzels are surrounded by oil and the crumbing becomes ‘