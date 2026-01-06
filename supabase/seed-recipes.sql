-- =====================================================
-- Seed Recipes Data
-- Inserts 40 diverse recipes assigned to existing users (20 + 20)
-- Run this in Supabase SQL Editor
-- =====================================================

-- User IDs:
-- 8e4b0e9c-1cee-42a0-8abb-0087654bf39a - myUser16 (testuser16@gmail.com)
-- bce8a223-1eb9-46bb-9f1c-c978e2c4e211 - testuser12 (testuser12@hotmail.com)
-- ef28a461-94d0-4a2e-9ca9-26420dbfbd51 - testuser15 (testuser15@outlook.com)
-- cd2b0058-a472-45a7-9342-5034a7f8ccf8 - testuser5 (testuser5@gmail.com)

-- Insert 20 diverse recipes
INSERT INTO public.recipes (user_id, title, ingredients, instructions, cooking_time, difficulty, category)
VALUES
  -- Breakfast Recipes (5 recipes)
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Classic Pancakes',
    '2 cups all-purpose flour
2 tablespoons sugar
2 teaspoons baking powder
1 teaspoon salt
2 eggs
1 1/2 cups milk
1/4 cup melted butter
1 teaspoon vanilla extract',
    '1. In a large bowl, whisk together flour, sugar, baking powder, and salt.
2. In another bowl, beat eggs, then add milk, melted butter, and vanilla.
3. Pour wet ingredients into dry ingredients and stir until just combined (small lumps are okay).
4. Heat a lightly oiled griddle or pan over medium heat.
5. Pour 1/4 cup batter for each pancake.
6. Cook until bubbles form on the surface, then flip and cook until golden brown.
7. Serve warm with maple syrup and butter.',
    20,
    'Easy',
    'Breakfast'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Avocado Toast with Poached Eggs',
    '2 slices sourdough bread
1 ripe avocado
2 eggs
Salt and pepper to taste
Red pepper flakes (optional)
Lemon juice
Fresh chives for garnish',
    '1. Bring a pot of water to a gentle boil and add a splash of vinegar.
2. While water heats, toast the sourdough bread.
3. Mash avocado in a bowl with salt, pepper, and a squeeze of lemon.
4. Poach eggs by creating a whirlpool in the water and gently dropping eggs in.
5. Cook for 3-4 minutes until whites are set but yolk is still runny.
6. Spread avocado mixture on toast.
7. Top with poached eggs and garnish with chives and red pepper flakes.',
    15,
    'Medium',
    'Breakfast'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'French Toast',
    '6 slices thick bread
3 eggs
3/4 cup milk
1 tablespoon sugar
1 teaspoon vanilla extract
1/2 teaspoon cinnamon
Butter for cooking
Maple syrup for serving',
    '1. In a shallow dish, whisk together eggs, milk, sugar, vanilla, and cinnamon.
2. Dip each slice of bread into the egg mixture, coating both sides.
3. Heat butter in a large skillet over medium heat.
4. Cook bread slices until golden brown, about 3-4 minutes per side.
5. Serve immediately with maple syrup and fresh berries.',
    15,
    'Easy',
    'Breakfast'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Scrambled Eggs with Herbs',
    '6 large eggs
2 tablespoons butter
2 tablespoons fresh chives, chopped
1 tablespoon fresh dill, chopped
Salt and pepper to taste
2 tablespoons heavy cream (optional)',
    '1. Crack eggs into a bowl and whisk gently until whites and yolks are combined.
2. Add herbs, salt, and pepper to the eggs.
3. Heat butter in a non-stick skillet over medium-low heat.
4. Pour in eggs and let them set slightly before gently stirring.
5. Continue to stir gently, folding the eggs as they cook.
6. Remove from heat when eggs are still slightly wet (they will continue cooking).
7. Serve immediately on toast or with fresh vegetables.',
    10,
    'Easy',
    'Breakfast'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Overnight Oats',
    '1 cup rolled oats
1 cup milk or almond milk
1/2 cup Greek yogurt
1 tablespoon honey or maple syrup
1/2 cup fresh berries
1/4 cup chopped nuts
1 teaspoon vanilla extract
Pinch of cinnamon',
    '1. In a jar or bowl, combine oats, milk, yogurt, and vanilla.
2. Stir in honey or maple syrup and cinnamon.
3. Add berries and nuts, mix gently.
4. Cover and refrigerate overnight or for at least 4 hours.
5. Stir before serving and add more milk if needed.
6. Top with additional fresh fruit before serving.',
    5,
    'Easy',
    'Breakfast'
  ),

  -- Lunch Recipes (5 recipes)
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Chicken Caesar Salad',
    '2 boneless chicken breasts
1 large head romaine lettuce
1/2 cup Caesar dressing
1/4 cup grated Parmesan cheese
Croutons
Black pepper',
    '1. Season chicken breasts with salt and pepper.
2. Grill or pan-sear chicken until cooked through (165°F internal temperature).
3. Let chicken rest, then slice into strips.
4. Wash and chop romaine lettuce into bite-sized pieces.
5. Toss lettuce with Caesar dressing.
6. Top with sliced chicken, Parmesan cheese, and croutons.
7. Serve immediately.',
    25,
    'Easy',
    'Lunch'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Vegetable Wrap',
    '2 large tortillas
1 cup hummus
1/2 cup shredded carrots
1/2 cup cucumber, sliced
1/2 cup bell peppers, sliced
1/4 cup red onion, sliced
2 cups fresh spinach
Salt and pepper',
    '1. Lay tortillas flat on a work surface.
2. Spread hummus evenly over each tortilla.
3. Layer vegetables starting with spinach, then carrots, cucumber, bell peppers, and red onion.
4. Season with salt and pepper.
5. Fold in the sides of the tortilla, then roll tightly from the bottom.
6. Cut in half diagonally and serve.',
    10,
    'Easy',
    'Lunch'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Greek Quinoa Bowl',
    '1 cup quinoa
2 cups vegetable broth
1 cup cherry tomatoes, halved
1 cucumber, diced
1/2 red onion, diced
1/2 cup kalamata olives
4 oz feta cheese, crumbled
3 tablespoons olive oil
2 tablespoons lemon juice
1 teaspoon oregano
Salt and pepper',
    '1. Rinse quinoa under cold water.
2. Cook quinoa in vegetable broth according to package directions.
3. Let quinoa cool to room temperature.
4. In a large bowl, combine cooked quinoa with tomatoes, cucumber, red onion, and olives.
5. Whisk together olive oil, lemon juice, oregano, salt, and pepper for dressing.
6. Toss salad with dressing.
7. Top with crumbled feta cheese and serve.',
    30,
    'Easy',
    'Lunch'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Turkey Club Sandwich',
    '12 slices bread (toasted)
1 lb turkey breast, sliced
8 slices bacon, cooked
4 leaves lettuce
2 large tomatoes, sliced
Mayonnaise
Salt and pepper',
    '1. Toast all bread slices until golden brown.
2. Cook bacon until crispy, drain on paper towels.
3. Spread mayonnaise on one side of each bread slice.
4. Layer turkey, bacon, lettuce, and tomato on bread.
5. Season with salt and pepper.
6. Top with second slice of bread and cut diagonally.
7. Secure with toothpicks and serve.',
    15,
    'Easy',
    'Lunch'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Lentil Soup',
    '1 cup dried lentils
4 cups vegetable broth
1 onion, diced
2 carrots, diced
2 celery stalks, diced
3 cloves garlic, minced
1 teaspoon cumin
1/2 teaspoon turmeric
2 tablespoons olive oil
Salt and pepper
Fresh parsley for garnish',
    '1. Rinse lentils and set aside.
2. Heat olive oil in a large pot over medium heat.
3. Sauté onion, carrots, and celery until soft, about 5 minutes.
4. Add garlic, cumin, and turmeric, cook for 1 minute.
5. Add lentils and vegetable broth, bring to a boil.
6. Reduce heat and simmer for 30-40 minutes until lentils are tender.
7. Season with salt and pepper.
8. Serve hot, garnished with fresh parsley.',
    45,
    'Easy',
    'Lunch'
  ),

  -- Dinner Recipes (5 recipes)
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Spaghetti Carbonara',
    '1 pound spaghetti
6 oz pancetta, diced
4 large eggs
1 cup grated Pecorino Romano cheese
Black pepper
Salt',
    '1. Bring a large pot of salted water to boil and cook spaghetti until al dente.
2. Meanwhile, cook pancetta in a large skillet until crispy.
3. In a bowl, whisk eggs with grated cheese and black pepper.
4. Drain pasta, reserving 1/2 cup pasta water.
5. Immediately add hot pasta to the skillet with pancetta.
6. Remove from heat and quickly toss with egg mixture.
7. Add pasta water gradually until sauce is creamy.
8. Serve immediately with extra cheese and pepper.',
    25,
    'Medium',
    'Dinner'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Grilled Salmon with Vegetables',
    '4 salmon fillets (6 oz each)
2 zucchini, sliced
2 yellow squash, sliced
1 red bell pepper, sliced
1 onion, sliced
3 tablespoons olive oil
2 lemons
Fresh dill
Salt and pepper',
    '1. Preheat grill to medium-high heat.
2. Season salmon with salt, pepper, and dill.
3. Toss vegetables with olive oil, salt, and pepper.
4. Grill salmon for 4-5 minutes per side until flaky.
5. Grill vegetables in a grill basket until tender, about 10 minutes.
6. Serve salmon with grilled vegetables and lemon wedges.',
    25,
    'Medium',
    'Dinner'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Beef Stir Fry',
    '1 lb beef sirloin, sliced thin
2 bell peppers, sliced
1 onion, sliced
2 cups broccoli florets
3 cloves garlic, minced
1 tablespoon ginger, grated
1/4 cup soy sauce
2 tablespoons hoisin sauce
1 tablespoon cornstarch
2 tablespoons vegetable oil
Cooked rice for serving',
    '1. Mix soy sauce, hoisin sauce, and cornstarch to make sauce.
2. Heat oil in a large wok or skillet over high heat.
3. Add beef and cook until browned, about 3-4 minutes. Remove.
4. Add garlic and ginger, stir for 30 seconds.
5. Add vegetables and stir-fry for 3-4 minutes until crisp-tender.
6. Return beef to pan and add sauce.
7. Stir until sauce thickens, about 1-2 minutes.
8. Serve over rice.',
    20,
    'Medium',
    'Dinner'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Chicken Tikka Masala',
    '2 lbs chicken breast, cubed
1 cup plain yogurt
2 tablespoons garam masala
1 onion, diced
3 cloves garlic, minced
1 tablespoon ginger, grated
1 can (14 oz) diced tomatoes
1 cup heavy cream
2 tablespoons butter
Cooked basmati rice
Fresh cilantro',
    '1. Marinate chicken in yogurt and 1 tablespoon garam masala for at least 1 hour.
2. Heat butter in a large pan and cook chicken until done. Remove.
3. In same pan, sauté onion until soft.
4. Add garlic and ginger, cook for 1 minute.
5. Add tomatoes and remaining garam masala, simmer for 10 minutes.
6. Blend sauce until smooth, return to pan.
7. Add cream and cooked chicken, simmer for 5 minutes.
8. Serve over rice with fresh cilantro.',
    45,
    'Hard',
    'Dinner'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Vegetarian Lasagna',
    '9 lasagna noodles
2 cups marinara sauce
2 cups ricotta cheese
2 cups shredded mozzarella
1/2 cup grated Parmesan
2 cups spinach
1 zucchini, sliced
1 cup mushrooms, sliced
2 cloves garlic, minced
Olive oil',
    '1. Cook lasagna noodles according to package directions.
2. Sauté vegetables with garlic until tender.
3. Preheat oven to 375°F.
4. Layer marinara sauce, noodles, ricotta, vegetables, and mozzarella in a 9x13 dish.
5. Repeat layers, ending with sauce and Parmesan.
6. Cover with foil and bake for 45 minutes.
7. Remove foil and bake 15 more minutes until bubbly.
8. Let rest 10 minutes before serving.',
    90,
    'Medium',
    'Dinner'
  ),

  -- Dessert Recipes (3 recipes)
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Chocolate Chip Cookies',
    '2 1/4 cups all-purpose flour
1 teaspoon baking soda
1 teaspoon salt
1 cup butter, softened
3/4 cup granulated sugar
3/4 cup brown sugar
2 eggs
2 teaspoons vanilla extract
2 cups chocolate chips',
    '1. Preheat oven to 375°F.
2. Mix flour, baking soda, and salt in a bowl.
3. In another bowl, cream butter and both sugars until light and fluffy.
4. Beat in eggs and vanilla.
5. Gradually blend in flour mixture.
6. Stir in chocolate chips.
7. Drop rounded tablespoons onto ungreased baking sheets.
8. Bake 9-11 minutes until golden brown.
9. Cool on baking sheet for 2 minutes before removing.',
    30,
    'Easy',
    'Dessert'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Berry Crumble',
    '4 cups mixed berries
1/2 cup sugar
2 tablespoons cornstarch
1 cup all-purpose flour
1/2 cup rolled oats
1/2 cup brown sugar
1/2 teaspoon cinnamon
1/2 cup cold butter, cubed',
    '1. Preheat oven to 375°F.
2. Toss berries with sugar and cornstarch, place in baking dish.
3. In a bowl, mix flour, oats, brown sugar, and cinnamon.
4. Cut in butter until mixture resembles coarse crumbs.
5. Sprinkle crumble mixture over berries.
6. Bake for 35-40 minutes until top is golden and berries are bubbling.
7. Serve warm with vanilla ice cream.',
    50,
    'Easy',
    'Dessert'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Tiramisu',
    '6 egg yolks
3/4 cup sugar
1 cup mascarpone cheese
1 1/2 cups heavy cream
2 cups strong coffee, cooled
1/4 cup coffee liqueur (optional)
24 ladyfinger cookies
Cocoa powder for dusting',
    '1. Beat egg yolks and sugar until thick and pale.
2. Fold in mascarpone until smooth.
3. Whip cream to stiff peaks and fold into mascarpone mixture.
4. Mix coffee and liqueur in a shallow dish.
5. Quickly dip ladyfingers in coffee mixture and layer in dish.
6. Spread half of mascarpone mixture over ladyfingers.
7. Repeat with another layer of dipped ladyfingers and remaining mascarpone.
8. Chill for at least 4 hours or overnight.
9. Dust with cocoa powder before serving.',
    30,
    'Hard',
    'Dessert'
  ),

  -- Appetizer & Snack Recipes (2 recipes)
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Bruschetta',
    '6 slices Italian bread
3 large tomatoes, diced
2 cloves garlic, minced
1/4 cup fresh basil, chopped
2 tablespoons olive oil
1 tablespoon balsamic vinegar
Salt and pepper
Parmesan cheese for garnish',
    '1. Preheat oven to 400°F.
2. Brush bread slices with olive oil and toast until golden, about 5 minutes.
3. Rub toasted bread with garlic cloves.
4. In a bowl, combine tomatoes, basil, olive oil, balsamic vinegar, salt, and pepper.
5. Let tomato mixture marinate for 10 minutes.
6. Spoon tomato mixture onto toasted bread.
7. Garnish with Parmesan cheese and serve immediately.',
    20,
    'Easy',
    'Appetizer'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Homemade Hummus',
    '1 can (15 oz) chickpeas, drained
1/4 cup tahini
2 cloves garlic
3 tablespoons lemon juice
2 tablespoons olive oil
1 teaspoon cumin
Salt to taste
Water as needed
Paprika and olive oil for garnish',
    '1. Rinse and drain chickpeas.
2. In a food processor, combine chickpeas, tahini, garlic, lemon juice, olive oil, and cumin.
3. Process until smooth, adding water gradually until desired consistency.
4. Season with salt to taste.
5. Transfer to serving bowl.
6. Drizzle with olive oil and sprinkle with paprika.
7. Serve with vegetables or pita chips.',
    15,
    'Easy',
    'Snack'
  ),

  -- Second batch of 20 recipes
  -- Breakfast Recipes (4 recipes)
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Belgian Waffles',
    '2 cups all-purpose flour
2 tablespoons sugar
1 tablespoon baking powder
1/2 teaspoon salt
2 eggs, separated
1 3/4 cups milk
1/2 cup melted butter
1 teaspoon vanilla extract',
    '1. In a large bowl, whisk together flour, sugar, baking powder, and salt.
2. In another bowl, beat egg yolks, then add milk, melted butter, and vanilla.
3. Whip egg whites until stiff peaks form.
4. Combine wet ingredients with dry ingredients.
5. Gently fold in whipped egg whites.
6. Preheat waffle iron and cook according to manufacturer''s instructions.
7. Serve with butter, syrup, and fresh berries.',
    25,
    'Medium',
    'Breakfast'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Breakfast Burrito',
    '4 large flour tortillas
6 eggs
4 slices bacon, cooked and crumbled
1 cup shredded cheddar cheese
1/2 cup diced bell peppers
1/2 cup diced onion
1 tablespoon butter
Salsa and sour cream for serving',
    '1. Heat butter in a large skillet over medium heat.
2. Sauté peppers and onion until tender, about 5 minutes.
3. Whisk eggs and pour into skillet with vegetables.
4. Scramble eggs, adding bacon halfway through cooking.
5. Warm tortillas in a dry pan or microwave.
6. Divide egg mixture among tortillas.
7. Top with cheese, roll tightly, and serve with salsa and sour cream.',
    20,
    'Easy',
    'Breakfast'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Banana Bread',
    '3 ripe bananas, mashed
1/3 cup melted butter
3/4 cup sugar
1 egg, beaten
1 teaspoon vanilla extract
1 teaspoon baking soda
Pinch of salt
1 1/2 cups all-purpose flour
1/2 cup chopped walnuts (optional)',
    '1. Preheat oven to 350°F. Grease a 9x5 inch loaf pan.
2. In a bowl, mix mashed bananas with melted butter.
3. Mix in sugar, egg, and vanilla extract.
4. Sprinkle baking soda and salt over the mixture and mix in.
5. Add flour and mix until just combined.
6. Fold in walnuts if using.
7. Pour batter into prepared pan and bake for 60-65 minutes.
8. Cool in pan for 10 minutes, then turn out onto wire rack.',
    75,
    'Easy',
    'Breakfast'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Eggs Benedict',
    '4 English muffins, split
8 slices Canadian bacon
8 eggs
1 tablespoon white vinegar
1/2 cup butter
3 egg yolks
1 tablespoon lemon juice
1/2 teaspoon salt
Dash of cayenne pepper',
    '1. Toast English muffins and keep warm.
2. Cook Canadian bacon in a skillet until lightly browned.
3. Poach eggs: bring water with vinegar to a gentle boil, create whirlpool, drop in eggs, cook 3-4 minutes.
4. Make hollandaise: whisk egg yolks, lemon juice, salt, and cayenne over double boiler.
5. Gradually whisk in melted butter until sauce thickens.
6. Place bacon on muffins, top with poached eggs.
7. Spoon hollandaise over eggs and serve immediately.',
    30,
    'Hard',
    'Breakfast'
  ),

  -- Lunch Recipes (4 recipes)
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Chicken Pesto Panini',
    '8 slices ciabatta bread
2 cups cooked chicken, shredded
1/2 cup pesto
2 tomatoes, sliced
4 slices mozzarella cheese
2 tablespoons olive oil
Salt and pepper',
    '1. Preheat panini press or grill pan.
2. Mix shredded chicken with pesto.
3. Layer chicken mixture, tomato slices, and mozzarella on bread.
4. Season with salt and pepper.
5. Brush outside of sandwiches with olive oil.
6. Press in panini maker or grill until cheese melts and bread is golden.
7. Cut in half and serve hot.',
    15,
    'Easy',
    'Lunch'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Minestrone Soup',
    '2 tablespoons olive oil
1 onion, diced
2 carrots, diced
2 celery stalks, diced
3 cloves garlic, minced
1 can (14 oz) diced tomatoes
4 cups vegetable broth
1 can (15 oz) cannellini beans, drained
1 cup small pasta
2 cups spinach
1 teaspoon oregano
1/2 cup grated Parmesan
Salt and pepper',
    '1. Heat olive oil in a large pot over medium heat.
2. Sauté onion, carrots, and celery until soft, about 5 minutes.
3. Add garlic and cook for 1 minute.
4. Add tomatoes, broth, oregano, salt, and pepper.
5. Bring to a boil, then reduce heat and simmer for 15 minutes.
6. Add beans and pasta, cook for 10 minutes until pasta is tender.
7. Stir in spinach and cook for 2 more minutes.
8. Serve hot with grated Parmesan cheese.',
    35,
    'Medium',
    'Lunch'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Caprese Salad',
    '4 large tomatoes, sliced
1 lb fresh mozzarella, sliced
1/4 cup fresh basil leaves
3 tablespoons olive oil
1 tablespoon balsamic vinegar
Salt and pepper',
    '1. Arrange tomato and mozzarella slices alternately on a platter.
2. Tuck fresh basil leaves between slices.
3. Drizzle with olive oil and balsamic vinegar.
4. Season with salt and pepper.
5. Let stand for 10 minutes before serving to allow flavors to meld.
6. Serve at room temperature.',
    10,
    'Easy',
    'Lunch'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Tuna Salad Sandwich',
    '2 cans (5 oz each) tuna, drained
1/4 cup mayonnaise
2 tablespoons celery, diced
2 tablespoons red onion, diced
1 tablespoon pickle relish
1 teaspoon lemon juice
Salt and pepper
8 slices bread
Lettuce leaves
Sliced tomato',
    '1. In a bowl, flake tuna with a fork.
2. Mix in mayonnaise, celery, onion, relish, and lemon juice.
3. Season with salt and pepper to taste.
4. Toast bread slices if desired.
5. Spread tuna mixture on half the bread slices.
6. Top with lettuce, tomato, and remaining bread.
7. Cut in half and serve.',
    10,
    'Easy',
    'Lunch'
  ),

  -- Dinner Recipes (6 recipes)
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Beef Tacos',
    '1 lb ground beef
1 packet taco seasoning
1/2 cup water
8 taco shells
1 cup shredded lettuce
1 cup shredded cheddar cheese
2 tomatoes, diced
1/2 cup sour cream
Salsa',
    '1. Brown ground beef in a large skillet over medium-high heat.
2. Drain excess fat, then add taco seasoning and water.
3. Simmer until liquid is reduced, about 5 minutes.
4. Warm taco shells according to package directions.
5. Fill shells with beef mixture.
6. Top with lettuce, cheese, tomatoes, sour cream, and salsa.
7. Serve immediately.',
    20,
    'Easy',
    'Dinner'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Shrimp Scampi',
    '1 lb large shrimp, peeled and deveined
1/2 lb linguine
4 tablespoons butter
3 cloves garlic, minced
1/4 cup white wine
2 tablespoons lemon juice
1/4 cup fresh parsley, chopped
Salt and pepper
Red pepper flakes (optional)',
    '1. Cook linguine according to package directions.
2. Heat butter in a large skillet over medium-high heat.
3. Add garlic and cook for 1 minute until fragrant.
4. Add shrimp and cook for 2-3 minutes per side until pink.
5. Add white wine and lemon juice, simmer for 1 minute.
6. Season with salt, pepper, and red pepper flakes.
7. Toss with cooked linguine and parsley.
8. Serve immediately.',
    25,
    'Medium',
    'Dinner'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'BBQ Pulled Pork',
    '3 lbs pork shoulder
1 cup BBQ sauce
1/2 cup apple cider vinegar
2 tablespoons brown sugar
1 tablespoon paprika
1 teaspoon garlic powder
1 teaspoon onion powder
Salt and pepper
Hamburger buns for serving',
    '1. Season pork with salt, pepper, paprika, garlic powder, and onion powder.
2. Place pork in slow cooker with vinegar and brown sugar.
3. Cook on low for 8 hours until tender.
4. Remove pork and shred with two forks.
5. Mix shredded pork with BBQ sauce.
6. Return to slow cooker and cook for 30 more minutes.
7. Serve on hamburger buns with coleslaw.',
    510,
    'Medium',
    'Dinner'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Chicken Fajitas',
    '1.5 lbs chicken breast, sliced
2 bell peppers, sliced
1 onion, sliced
2 tablespoons olive oil
1 packet fajita seasoning
8 flour tortillas
Sour cream, guacamole, and salsa for serving',
    '1. Toss chicken with fajita seasoning and 1 tablespoon oil.
2. Heat remaining oil in a large skillet over high heat.
3. Cook chicken until done, about 5-6 minutes. Remove.
4. Add peppers and onion to same pan, cook until tender-crisp.
5. Return chicken to pan and toss together.
6. Warm tortillas in a dry pan.
7. Serve with sour cream, guacamole, and salsa.',
    25,
    'Easy',
    'Dinner'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Eggplant Parmesan',
    '2 large eggplants, sliced
2 cups marinara sauce
2 cups shredded mozzarella
1 cup grated Parmesan
2 eggs, beaten
2 cups breadcrumbs
1/2 cup flour
Olive oil
Fresh basil',
    '1. Salt eggplant slices and let sit for 30 minutes to draw out moisture.
2. Pat dry and dredge in flour, then egg, then breadcrumbs.
3. Fry eggplant slices in olive oil until golden on both sides.
4. Preheat oven to 375°F.
5. Layer marinara, eggplant, and cheeses in a baking dish.
6. Repeat layers, ending with cheese.
7. Bake for 35-40 minutes until bubbly and golden.
8. Let rest 10 minutes, garnish with basil, and serve.',
    90,
    'Medium',
    'Dinner'
  ),
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Thai Curry',
    '1 lb chicken breast, cubed
2 cans (14 oz) coconut milk
2 tablespoons red curry paste
1 bell pepper, sliced
1 onion, sliced
2 carrots, sliced
1 tablespoon fish sauce
1 tablespoon brown sugar
1/4 cup fresh basil
Cooked jasmine rice',
    '1. Heat 1/4 cup coconut milk in a large pot.
2. Add curry paste and cook for 2 minutes until fragrant.
3. Add remaining coconut milk, fish sauce, and brown sugar.
4. Add chicken and cook for 10 minutes.
5. Add vegetables and cook for 5 more minutes until tender.
6. Stir in fresh basil.
7. Serve over jasmine rice.',
    25,
    'Medium',
    'Dinner'
  ),

  -- Dessert Recipes (3 recipes)
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Apple Crisp',
    '6 cups apples, peeled and sliced
1/2 cup sugar
1 tablespoon lemon juice
1 cup all-purpose flour
1 cup rolled oats
1 cup brown sugar
1 teaspoon cinnamon
1/2 cup cold butter, cubed
Vanilla ice cream for serving',
    '1. Preheat oven to 350°F.
2. Toss apples with sugar and lemon juice, place in baking dish.
3. In a bowl, mix flour, oats, brown sugar, and cinnamon.
4. Cut in butter until mixture resembles coarse crumbs.
5. Sprinkle topping over apples.
6. Bake for 45-50 minutes until apples are tender and topping is golden.
7. Serve warm with vanilla ice cream.',
    60,
    'Easy',
    'Dessert'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Cheesecake',
    '2 cups graham cracker crumbs
6 tablespoons butter, melted
4 packages (8 oz each) cream cheese, softened
1 1/4 cups sugar
4 eggs
1/2 cup sour cream
2 teaspoons vanilla extract',
    '1. Preheat oven to 325°F.
2. Mix graham cracker crumbs with melted butter and press into springform pan.
3. Beat cream cheese and sugar until smooth.
4. Add eggs one at a time, beating after each.
5. Mix in sour cream and vanilla.
6. Pour filling over crust.
7. Bake for 55-60 minutes until center is almost set.
8. Cool completely, then refrigerate for at least 4 hours before serving.',
    70,
    'Medium',
    'Dessert'
  ),
  (
    'ef28a461-94d0-4a2e-9ca9-26420dbfbd51', -- testuser15
    'Brownies',
    '1 cup butter, melted
2 cups sugar
4 eggs
1 teaspoon vanilla extract
1 1/4 cups cocoa powder
1 cup all-purpose flour
1/2 teaspoon baking powder
1/2 teaspoon salt
1 cup chocolate chips',
    '1. Preheat oven to 350°F. Grease a 9x13 inch pan.
2. Mix melted butter with sugar.
3. Beat in eggs and vanilla.
4. Stir in cocoa powder, flour, baking powder, and salt.
5. Fold in chocolate chips.
6. Pour batter into prepared pan.
7. Bake for 25-30 minutes until a toothpick comes out with moist crumbs.
8. Cool completely before cutting into squares.',
    35,
    'Easy',
    'Dessert'
  ),

  -- Appetizer & Snack Recipes (3 recipes)
  (
    'cd2b0058-a472-45a7-9342-5034a7f8ccf8', -- testuser5
    'Stuffed Jalapeños',
    '12 jalapeño peppers
8 oz cream cheese, softened
1 cup shredded cheddar cheese
1/2 teaspoon garlic powder
6 slices bacon, cooked and crumbled
Salt',
    '1. Preheat oven to 375°F.
2. Cut jalapeños in half lengthwise and remove seeds.
3. Mix cream cheese, cheddar cheese, garlic powder, and bacon.
4. Fill jalapeño halves with cheese mixture.
5. Place on baking sheet and bake for 20-25 minutes until peppers are tender.
6. Serve hot.',
    35,
    'Easy',
    'Appetizer'
  ),
  (
    '8e4b0e9c-1cee-42a0-8abb-0087654bf39a', -- myUser16
    'Guacamole',
    '4 ripe avocados
1/4 cup red onion, diced
1 jalapeño, seeded and diced
2 tablespoons fresh cilantro, chopped
2 tablespoons lime juice
1 clove garlic, minced
1 tomato, seeded and diced
Salt and pepper',
    '1. Cut avocados in half, remove pits, and scoop flesh into a bowl.
2. Mash avocados with a fork to desired consistency.
3. Stir in onion, jalapeño, cilantro, lime juice, and garlic.
4. Gently fold in tomato.
5. Season with salt and pepper to taste.
6. Serve immediately with tortilla chips or as a condiment.',
    10,
    'Easy',
    'Snack'
  ),
  (
    'bce8a223-1eb9-46bb-9f1c-c978e2c4e211', -- testuser12
    'Stuffed Mushrooms',
    '24 large button mushrooms
1/2 cup breadcrumbs
1/4 cup grated Parmesan
2 cloves garlic, minced
2 tablespoons fresh parsley, chopped
4 oz cream cheese, softened
2 tablespoons butter
Salt and pepper',
    '1. Preheat oven to 375°F.
2. Clean mushrooms and remove stems, chop stems finely.
3. Sauté chopped stems and garlic in butter until tender.
4. Mix sautéed stems with cream cheese, breadcrumbs, Parmesan, parsley, salt, and pepper.
5. Stuff mushroom caps with mixture.
6. Place on baking sheet and bake for 20 minutes until golden.
7. Serve warm.',
    35,
    'Medium',
    'Appetizer'
  );

-- Verify the insertions (all 40 recipes)
SELECT 
  r.title, 
  p.username, 
  p.email,
  r.category, 
  r.difficulty, 
  r.cooking_time 
FROM public.recipes r 
JOIN public.profiles p ON r.user_id = p.id 
ORDER BY r.created_at DESC 
LIMIT 40;