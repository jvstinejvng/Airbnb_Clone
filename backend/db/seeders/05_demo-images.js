'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        spotId: 1,
        type: 'spot',
        url: "https://i.pinimg.com/736x/5f/7c/d7/5f7cd78c7c520036b9e3a33fcd0fdce5.jpg",
      },
      {
        userId: 1,
        spotId: 1,
        type: 'spot',
        url: "https://st.hzcdn.com/simgs/pictures/laundry-rooms/hideaway-pet-dish-holder-wood-mode-fine-custom-cabinetry-img~a831db7c04888fed_4-4025-1-838fbdb.jpg",
      },
      {
        userId: 1,
        spotId: 1,
        type: 'spot',
        url: "https://i.pinimg.com/564x/8c/52/7a/8c527a759d241ae889bacb0a69cededb.jpg",
      },
      {
        userId: 1,
        spotId: 1,
        type: 'spot',
        url: "https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202307/0011/dog-toy-storage-basket-l.jpg",
      },
      {
        userId: 1,
        spotId: 1,
        type: 'spot',
        url: "https://i.pinimg.com/736x/60/86/94/6086946697d8fdfe82afe8d7ca267f59.jpg",
      },
      {
        userId: 1,
        spotId: 2,
        type: 'spot',
        url: "https://www.hayneedle.com/tips-and-ideas/wp-content/uploads/2013/09/dog-run-with-hammock-800x533.jpg",
      },
      {
        userId: 1,
        spotId: 2,
        type: 'spot',
        url: "https://img.cdn.mountainwarehouse.com/product/051430/051430_cre_puppy_bed_jac_lifestyle_ecom_aw22_01.jpg",
      },
      {
        userId: 1,
        spotId: 2,
        type: 'spot',
        url:"https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2018/8/20/4/HHSHM110_311946_1214372.jpg.rend.hgtvcom.616.822.suffix/1534771798325.jpeg",
      },
      {
        userId: 1,
        spotId: 2,
        type: 'spot',
        url: "https://i.pinimg.com/564x/03/ec/ee/03ecee47558503a1afbefb798659b911.jpg",
      },
      {
        userId: 1,
        spotId: 2,
        type: 'spot',
        url: "https://www.etsy.com/img/12566574/r/il/6175df/3049507975/il_1140xN.3049507975_8a1n.jpg",
      },
      {
        userId: 2,
        spotId: 3,
        type: 'spot',
        url: "https://i.pinimg.com/564x/1d/36/66/1d36660c241d0c0e1aadfe9626c3c408.jpg",
      },
      {
        userId: 2,
        spotId: 3,
        type: 'spot',
        url: "https://i.pinimg.com/564x/17/4a/5c/174a5ce508b30b04f07e4b34ff73adbb.jpg",
      },
      {
        userId: 2,
        spotId: 3,
        type: 'spot',
        url: "https://i.pinimg.com/564x/ec/29/b2/ec29b20ad6eee8c0610a3692a6f1f906.jpg",
      },
      {
        userId: 2,
        spotId: 3,
        type: 'spot',
        url: "https://i.pinimg.com/564x/18/d2/c9/18d2c971fd8e1d7ca045e3edd06cb7c8.jpg",
      },
      {
        userId: 2,
        spotId: 3,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/1511/7434/products/Haven.PDP-min.jpg?v=1666739276&width=1296",
      },
      {
        userId: 1,
        spotId: 4,
        type: 'spot',
        url: "https://i.pinimg.com/564x/0d/31/4f/0d314fb988d69fefbbb16b965939afa8.jpg",
      },
      {
        userId: 1,
        spotId: 4,
        type: 'spot',
        url: "https://i.pinimg.com/564x/cb/a1/49/cba149e9ec4d774b30d3ae8eac7db4ca.jpg",
      },
      {
        userId: 1,
        spotId: 4,
        type: 'spot',
        url: "https://i.pinimg.com/564x/29/21/69/2921690251481b1ccad62f5d181f1051.jpg",
      },
      {
        userId: 1,
        spotId: 4,
        type: 'spot',
        url: "https://i.pinimg.com/originals/9e/cb/6b/9ecb6bdf4ebb99dace61d27398b3eccf.jpg",
      },
      {
        userId: 1,
        spotId: 4,
        type: 'spot',
        url: "https://homedesignlover.com/wp-content/uploads/2018/07/17-brooks-and-falotico.jpg",
      },
      {
        userId: 1,
        spotId: 5,
        type: 'spot',
        url: "https://i.pinimg.com/736x/71/a0/dd/71a0dd2e5143ecd48d0656e51fe2fb43.jpg",
      },
      {
        userId: 1,
        spotId: 5,
        type: 'spot',
        url: "https://static.onecms.io/wp-content/uploads/sites/34/2020/10/29/window-bed-for-cat-0918-4e7cc88e_vert.jpg",
      },
      {
        userId: 1,
        spotId: 5,
        type: 'spot',
        url: "https://image.chewy.com/is/image/catalog/214383_MAIN._AC_SL600_V1606832544_.jpg",
      },
      {
        userId: 1,
        spotId: 5,
        type: 'spot',
        url: "https://i.etsystatic.com/23809803/r/il/0c73fb/3159455514/il_794xN.3159455514_j06r.jpg",
      },
      {
        userId: 1,
        spotId: 5,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/0344/6469/products/gym01_1024x1024.jpg",
      },
      {
        userId: 2,
        spotId: 6,
        type: 'spot',
        url: "https://i.pinimg.com/736x/9d/9a/3f/9d9a3f5009620ca9ef5fa8b9d140a05a.jpg",
      },
      {
        userId: 2,
        spotId: 6,
        type: 'spot',
        url: "https://houseandhistory.com/wp-content/uploads/2021/03/Anne-Hathaway-Princess-Diaries.jpg",
      },
      {
        userId: 2,
        spotId: 6,
        type: 'spot',
        url: "https://i.pinimg.com/736x/d2/0f/40/d20f401895f1567ee5a01c12fe4180e0.jpg",
      },
      {
        userId: 2,
        spotId: 6,
        type: 'spot',
        url: "https://i.pinimg.com/564x/42/03/1a/42031aa1201822817ef591444e396a6e.jpg",
      },
      {
        userId: 2,
        spotId: 6,
        type: 'spot',
        url: "https://hookedonhouses.net/wp-content/uploads/2014/10/Mias-bedroom-in-Princess-Diaries-5.jpg",
      },
      {
        userId: 3,
        spotId: 7,
        type: 'spot',
        url: "https://i.pinimg.com/564x/31/ab/3f/31ab3f33a2d5a78d0723bfc0a3dd85dd.jpg",
      },
      {
        userId: 3,
        spotId: 7,
        type: 'spot',
        url: "https://i.pinimg.com/564x/c5/04/a8/c504a8aa5bb94562dc9094bd91208893.jpg",
      },
      {
        userId: 3,
        spotId: 7,
        type: 'spot',
        url: "https://i.etsystatic.com/38718256/r/il/3b6bb1/4405352174/il_1588xN.4405352174_rmar.jpg",
      },
      {
        userId: 3,
        spotId: 7,
        type: 'spot',
        url: "https://i.pinimg.com/564x/ee/73/e4/ee73e4400f3cc6b406552551d4692ae7.jpg",
      },
      {
        userId: 3,
        spotId: 7,
        type: 'spot',
        url: "https://www.chesterfieldobserver.com/wp-content/uploads/images/2022-09-21/22p1.jpg",
      },
      {
        userId: 4,
        spotId: 8,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/0085/4641/8752/products/laylo-pets-boho-lay-lo-pets-blue-bogolan-boho-dog-bed-or-bed-cover-lay-lo-29080675057850_1200x800.jpg?v=1627998838",
      },
      {
        userId: 4,
        spotId: 8,
        type: 'spot',
        url: "https://i.pinimg.com/564x/2c/be/3a/2cbe3a59966acb8bdf7d2e996f753f02.jpg",
      },
      {
        userId: 4,
        spotId: 8,
        type: 'spot',
        url: "https://i.pinimg.com/564x/bd/4e/f3/bd4ef3966a6983716e8f21607c608db2.jpg",
      },
      {
        userId: 4,
        spotId: 8,
        type: 'spot',
        url: "https://i.pinimg.com/564x/e7/0b/68/e70b689aa9fcca679fe7a16362ae19c7.jpg",
      },
      {
        userId: 4,
        spotId: 8,
        type: 'spot',
        url: "https://i.pinimg.com/564x/6b/4f/2e/6b4f2e48efff682f921194f23b5a3c4b.jpg",
      },
      {
        userId: 8,
        spotId: 9,
        type: 'spot',
        url: "https://i.pinimg.com/564x/b8/87/5e/b8875e8a905693b8a859e90bcfe21e39.jpg",
      },
      {
        userId: 8,
        spotId: 9,
        type: 'spot',
        url: "https://i.pinimg.com/564x/db/6a/7c/db6a7c534456cd1cce6bd247d4460424.jpg",
      },
      {
        userId: 8,
        spotId: 9,
        type: 'spot',
        url: "https://i.pinimg.com/564x/9c/f9/66/9cf966bb1fa143b4d6dfc1f29840b312.jpg",
      },
      {
        userId: 8,
        spotId: 9,
        type: 'spot',
        url: "https://i.pinimg.com/564x/47/d4/36/47d4366b802a023e36ede1c68601ce7d.jpg",
      },
      {
        userId: 8,
        spotId: 9,
        type: 'spot',
        url: "https://i.pinimg.com/564x/8c/38/7a/8c387a79ac9979222e496bbce912def9.jpg",
      },
      {
        userId: 5,
        spotId: 10,
        type: 'spot',
        url: "https://www.outsideonline.com/wp-content/uploads/2022/04/astroturf_h.jpg",
      },
      {
        userId: 5,
        spotId: 10,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/2117/3313/products/CNDR0981_1800x1800.jpg",
      },
      {
        userId: 5,
        spotId: 10,
        type: 'spot',
        url: "https://i.pinimg.com/564x/b5/f1/4e/b5f14edcea67f36bced9c200dad83428.jpg",
      },
      {
        userId: 5,
        spotId: 10,
        type: 'spot',
        url: "https://www.etsy.com/img/38718256/r/il/4c5fd7/4382395047/il_794xN.4382395047_glqs.jpg",
      },
      {
        userId: 5,
        spotId: 10,
        type: 'spot',
        url: "https://i.pinimg.com/564x/ce/4d/fb/ce4dfb2552fcc5be148df53871a060c8.jpg",
      },
      {
        userId: 12,
        spotId: 11,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/1891/0077/files/2B02F742-3E70-44FC-8589-08315C98E799_-_Jamie_1_1500x.jpg?v=1644505150",
      },
      {
        userId: 12,
        spotId: 11,
        type: 'spot',
        url: "https://i.pinimg.com/564x/1d/16/83/1d16837d6941295ef044429b86ab9dc9.jpg",
      },
      {
        userId: 12,
        spotId: 11,
        type: 'spot',
        url: "https://i.pinimg.com/564x/b3/3b/15/b33b15df35300cb96944c283134bf873.jpg",
      },  
      {
        userId: 12,
        spotId: 11,
        type: 'spot',
        url: "https://www.tillysnest.com/wp-content/uploads/Caughey_Melissa_Original-Omlet-Geo-Bird-Cage-3.jpg",
      },
      {
        userId: 12,
        spotId: 11,
        type: 'spot',
        url: "https://i.pinimg.com/564x/40/69/b3/4069b306d063b92a01ce1becab670022.jpg",
      },
      {
        userId: 11,
        spotId: 12,
        type: 'spot',
        url: "https://i.pinimg.com/564x/0d/80/1d/0d801dca604cf60d356b4c5039a3d0aa.jpg"
      },
      {
        userId: 11,
        spotId: 12,
        type: 'spot',
        url: "https://i.pinimg.com/564x/f1/ba/8a/f1ba8ac9a50e439b81034257db767899.jpg"
      },
      {
        userId: 11,
        spotId: 12,
        type: 'spot',
        url: "https://i.pinimg.com/564x/43/ab/d2/43abd2cb62637bd12df58916824b96a8.jpg"
      },
      {
        userId: 11,
        spotId: 12,
        type: 'spot',
        url: "https://cornerstonebuilders.org/wp-content/uploads/2020/04/beach-style-hall-500x400.jpg",
      },
      {
        userId: 11,
        spotId: 12,
        type: 'spot',
        url: "https://cdn.shopify.com/s/files/1/0016/6032/1853/products/Pet-Swimming-Pool-Sprinkler-Pad-Inflatable-Water-Spray-Mat-Tub-Summer-Play-Cooling-Mat-Dog-Bathtub.jpg_Q90.jpg__5.jpg",
      },
    ], {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
