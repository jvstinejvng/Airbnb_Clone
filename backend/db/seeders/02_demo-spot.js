'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '3451 Park Pl',
        city: 'Pleasanton',
        state: 'California',
        country: 'United States',
        lat: 37.70884568787755,
        lng:  -121.8577699430043,
        name: 'Your Dogs will have a Pawsome Time!',
        description: "Home Away From Home Pet Boarding! Fun-filled, friendly cage-free dog boarding home loved and cared for by a family with three Kids and their labrador retriever. Our goal is to ensure your dog's stay is a wonderful experience, so they look forward to staying with me and my family time and time again. Our pets are like family to us, and in this home, your fur babies will get all the love, affection, and one-on-one attention they would get in their home.",
        price: 50,
        previewImage: 'https://i.pinimg.com/564x/a4/1e/ac/a41eacfbf05f3ed4c2fe11e9f2fa1460.jpg',
      },
      {
        ownerId: 1,
        address: '11233 Center St',
        city: 'Brookdale',
        state: 'California',
        country: 'United States',
        lat:  37.11541414647985,
        lng: -122.10566464543096,
        name: "Treat your pup to a pawsitively fun & safe experience",
        description: "Hello, I am an experienced dog owner of twenty years, offering short-term and long-term boarding for puppies and small dogs. My purpose is to provide the best, safest experience for your pup. I currently work from home and will be with your Dog 24/7, assuring they have the best care and attention. Your dog will have full access to my apartment, and I am happy to adjust my schedule to your puppy's needs. My dog, Harley (dachshund), and I look forward to meeting you and your dog. Harley loves other dogs and will be an incredible friend to your dog.",
        price: 70,
        previewImage: 'https://i.pinimg.com/564x/dc/2f/72/dc2f728a50c6a220c4bed0d0b1b3cc29.jpg',
      },
      {
        ownerId: 1,
        address: '730 11th Ave',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 40.77091306390253,
        lng: -73.9939098251481,
        name: "This is Purrfect -Purrfect Purrfect Purrfect",
        description: "Meow, it's your trusted neighborhood cat sitter here. On the block, I am known as the cat whisperer because I've fostered kitties, adopted older cats, and served our feline leaders since 'furever'. I have years of experience with cats of all kinds. One of my favorite parts about cat sitting is sending daily photos and updates on how fabulous cat(s) are doing. I specialize in offering reassurance and peace of mind to shy & nervous cats and humans too! Your cat(s) will receive all the loving attention in the world with the warm comfort & safety of my house.",
        price: 100,
        previewImage: "https://i.pinimg.com/564x/d4/2f/19/d42f198a5f917e51fa25a6e1c6a1b6ef.jpg"
      },
        {
        ownerId: 1,
        address: '2850 S Quincy St',
        city: 'Arlington',
        state: 'Virginia',
        country: 'United States',
        lat: 38.88423715062414,
        lng: -77.10822080453617,
        name: "The Metropawlitan Pets have Voted Us as their Favorite Pet Hotel",
        description: "Here is where furry friendships are made, and unforgettable memories are created. My free-roaming home-environment pet-boarding is safe, secure, and far less stressful and frightening than traditional pet-boarding places. Hi! I am a professional dancer and a huge animal person. Growing up and to this day, my family frequently fostered and adopted cats and dogs. Since moving to Arlington, I have missed caring for fur buddies. I currently work part-time, so I have plenty of time to play with your kitty or pup! I also live with my brother and his girlfriend, so someone is always at home with your fur baby. We are all animal lovers and can't wait to meet your fur baby. I am very observant and attentive and will take great care of your fur baby. Whatever rules you have at your house, I will keep in mine!",
        price: 150,
        previewImage: 'https://nextluxury.com/wp-content/uploads/large-dog-room-ideas.jpg',
      },
      {
        ownerId: 1,
        address: '12700 Hillcrest Rd',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: 32.96118189543843,
        lng: -96.79548337502388,
        name: "Cat's Cradle: cage-free, cats only lodging",
        description: "We are a small family of three providing exquisite personalized cat boarding. We are excited to welcome you and your furry friend to our luxury home environment exclusively for cats! Our goal is to provide a stress-free haven for furry guests. We are a cage-free home with lots of room to climb, hide and play. Our house has a lot of natural light, a fenced backyard for our outdoor cat guests, and of course, spots to tuck away and nap. We have rooms for single cats and rooms that can board a family of cats (from the same house). Look no further, and no longer worry about what to do with your furry friend when planning a vacation or when suddenly called out of town. We are here to give you the freedom to travel, even on short notice, with the knowledge your cat(s) are happy and safe in a cat-loving house with dependable and reliable care.",
        price: 200,
        previewImage: 'https://i.pinimg.com/originals/a5/6b/64/a56b64585b2b4a7095681adbae8a9b37.jpg',
      },
      {
        ownerId: 1,
        address: '724 Brazil Ave',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat:  37.72182854883529,
        lng: -122.4289896459381,
        name: 'Extra Plush Pillow Cat Bed in a Royal Firehouse Home',
        description: "Be a Queen(or King!) and give your adorable kitty the royal treatment. Hi, I'm Mia; some of you may recognize my name and my cat, Fat Louie. Yes, I am the Mia, Princess of Genovia. I am back home for a few months to unwind and recharge from my royal duties! My schedule for the upcoming months is to cuddle with as many kitties as possible, as that is my favorite pastime activity. My mother, Fat Louie, and I open our eccentric firehouse home to all our feline pals needing short-term care and lots of cuddles. We only accept one kitty guest at a time, leaving you confident that your cat will be loved as if they were our own.",
        price: 75,
        previewImage: 'https://houseandhistory.com/wp-content/uploads/2021/03/Anne-Hathaway-Cat.jpg',
      },
      {
        ownerId: 2,
        address: '11 Washington Square',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat:  40.73159338097427,
        lng: -73.99661900355062,
        name: "No Ruff Days, Just Tail Wags and Belly Rubs",
        description: "A home away from home made for your best friend to play with while you're away. At the age of six, I knew dogs were my people. At age eight, my parents caved and bought me my first puppy. He (Butter) and I were inseparable, my first best friend. Presently, I have two senior dogs, German Shepard, Cora, and Chocolate Labrador, Moose. I have experience with smaller breeds and puppies as well. Both my pups enjoy having dog guests and are very calm dogs. My girlfriend and I work from home full-time with flexible jobs that can allow us to cater to your dog's routine. I have comfy dog beds and endless amounts of toys and treats. And for free, I will give your dog belly rubs until my arm falls off!",
        price: 125,
        previewImage: 'https://i.pinimg.com/564x/6c/b5/c8/6cb5c8ee2ac30f6abe69122ceb445630.jpg',
      },
      {
        ownerId: 3,
        address: '6318 Biscayne Blvd',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.8355542567001,
        lng: -80.18619386813756,
        name: "Who is ready for a slumber pawty! ",
        description: "Here is your dog's invite to long walks on the beach,  lots of cuddles, and warm late nights under the stars. These are just a few perks to booking your dog's stay with my roommates and me. I live with two other females in a spacious house near the beach. We are all third-year law students and dog lovers. We host a maximum of three dogs at a time, with the exception of dog siblings. So why us? Well, besides living a block away from the beach, having a large fenced yard, and the endless love your pup will receive, we want to provide a home-away-from-home environment with an enriching experience for your pooch. ",
        price: 50,
        previewImage: 'https://cdn.shopify.com/s/files/1/0486/7532/4069/products/eleanor-rattan-pet-bed-hawaii-pre-order-pet-bed-picnic-imports-747311_1024x1024@2x.jpg?v=1644029709',
      },
      {
        ownerId: 4,
        address: '158 Wanso Rd',
        city: 'Reserve',
        state: 'Montana',
        country: 'United States',
        lat: 48.621251233704115,
        lng:  -104.8723502269843,
        name: "Paws, claws, tails all on board!",
        description: "Playing, adoring, and tending to your pet is my highest priority. I offer a fun and exciting environment for cats, dogs, rabbits, hamsters, guinea pigs, parrots, and parakeets. My private five-acre farm provides your pets with a unique outdoor and homestyle experience. I believe in a personalized approach to pet care, providing your peace of mind knowing your pet is safe, comfortable, and valued while you’re away. I offer dog owners a  free range boarding experience with access to my barns, pastures, and fields. I provide giant pens for bunnies with fresh greens and unlimited hay. I also offer grooming services for all pets. Your pet will experience days full of activity, engagement, and companionship while enjoying the true benefit of farm life.",
        price: 50,
        previewImage: 'https://64.media.tumblr.com/b2d723fcb6502de2e13fc24a0b1a6bed/tumblr_p8um77D45s1v7z7sqo1_1280.jpg',
      },
      {
        ownerId: 5,
        address: '1775 E Bolivar Ave',
        city: ' St Francis',
        state: 'Wisconsin',
        country: 'United States',
        lat: 42.98021272812919,
        lng:  -87.90085051351143,
        name: "While you roam, they have a home!",
        description: " I specialize in providing quality overnight stays for large dogs. With me, your dog's health, safety, and happiness are always of utmost importance, and I want nothing more than to make your dog's time away from home comfortable and memorable. My home is a no kennel, no cage zone. My home is where pets are family, where playtime is a must, and where there is no such thing as too much attention and affection. A dog's stay with me includes many outdoor activities, access to lots of dog toys, bathing services, and more. Also, I like to send morning and night pictures with updates to you.  So whether it's an overnight or a six-month stay, I would be delighted to provide your dog or dogs a home away from home experience.",
        price: 140,
        previewImage: 'https://cdn.itsoverflowing.com/wp-content/uploads/2020/04/Bone-Shaped-Dog-Pool.jpg',
      },
      {
        ownerId: 6,
        address: '3003 Cypress St,',
        city: 'West Monroe',
        state: 'Louisiana',
        country: 'United States',
        lat: 32.520723651812034,
        lng: -92.15398823346038,
        name: "Exotic Pet Haven: birds, chinchilla, turles...",
        description: "Not all pets are furry or four-legged! It is sometimes difficult to find a boarding facility that can take care of the needs of your unique pet and offer the attention they require. I offer exotic pet care for birds, reptiles, guinea pigs, and other small pets. Together, we will personalize your furry, scaly, or feathery friend's stay with their necessary accommodations, diets, feeding schedules, and temperature conditions. Go travel confidently! Knowing your exotic pets are in good hands and a safe home.",
        price: 140,
        previewImage: 'https://i.pinimg.com/originals/9f/22/4c/9f224c1e4f1a9538a8ba64f070c079b0.jpg',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
