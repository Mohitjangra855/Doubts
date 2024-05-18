const products = [
    {
        name: 'Zod Runner V3 Running Shoes',
        price: 1199,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/i/h/j/-original-imagyxqzyyfe6fps.jpeg?q=70',
        company: 'PUMA',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'SM-657 Running Shoes For Men',
        price: 1425,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/i/x/q/-original-imaggcb3ty7jvgu6.jpeg?q=70',
        company: 'SparX',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'NORTH PLUS Running Shoes',
        price: 1269,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/2/c/-original-imagz5bz9kbggbsb.jpeg?q=70',
        company: 'CAMPUS',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'FIRST Running Shoes For Men  (White)',
        price: 1264,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/i/x/q/-original-imaggcb3ty7jvgu6.jpeg?q=70',
        company: 'CAMPUS ',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'Zap-Run Running Shoes For Men',
        price: 2099,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/5/8/e/-original-imagyran2jyqpskz.jpeg?q=70',
        company: 'ADIDAS',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'Runesy M Running Shoes For Men',
        price: 899,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/j/i/n/-original-imagkybnk2dtpzqe.jpeg?q=70',
        company: 'ADIDAS',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'Adi Trend M Running Shoes For Men',
        price: 1799,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/y/3/p/-original-imagy2haqt7c6rvy.jpeg?q=70',
        company: 'ADIDAS',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'SM-752 Running Shoes For MenSlippers',
        price: 1599,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/x/m/4/-original-imagqsu2yn9ghjyp.jpeg?q=70',
        company: 'SparX',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'Atheleisure Sports Shoes for Men | Enhanced Comfort & D...',
        price: 1299,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/e/v/a/6-rso357-red-tape-blue-original-imagxyczmczgtwzg.jpeg?q=70',
        company: 'RED TAPE',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: 'Sports Walking Shoe',
        price: 1799,
        image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/o/w/j/6-rso358-red-tape-white-blue-original-imagvcv67hfr3bnw.jpeg?q=70',
        company: 'RED TAPE',
        category: "shoes",
        details: ['10 Days Return Policy','GST invoice available']
    },
    {
        name: "Samsung 55 inch 4K Ultra HD Smart LED TV",
        price: 54999,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThazH4g6VVRDUbrY0CIvVwbYFitUrZktyNhVn7eEdeBm3fcNLegr0_YXli3ScidFvauT8&usqp=CAU",
        company: "Samsung",
        details: ["55 inch 4K Ultra HD (3840 x 2160) resolution", "Smart TV with built-in apps", "Quantum Processor 4K"],
        category: "Electronics"
    },
    {
        name: "Men's Casual Shirt",
        price: 999,
        image: "https://5.imimg.com/data5/ANDROID/Default/2023/6/319935702/BU/WN/JG/192043273/product-jpeg-500x500.jpg",
        company: "Brand X",
        details: ["Material: Cotton", "Size: Large", "Color: Blue"],
        category: "Fashion"
    },
    {
        name: "Lenovo IdeaPad Gaming 3 Laptop",
        price: 64990,
        image: "https://m.media-amazon.com/images/I/81u-5gRjEXL._AC_UY218_.jpg",
        company: "Lenovo",
        details: ["15.6 inch Full HD display", "AMD Ryzen 5 4600H Processor", "8GB RAM, 512GB SSD"],
        category: "Computers"
    },
    {
        name: "Whirlpool 6.5 kg Fully Automatic Top Load Washing Machine",
        price: 15490,
        image: "https://p4-ofp.static.pub/fes/cms/2022/09/26/da8tws15p6155h2m5bfn8oxc3jpmpr766724.jpg",
        company: "Whirlpool",
        details: ["6.5 kg capacity", "Fully automatic top load", "Spa Wash System"],
        category: "Appliances"
    },
    {
        name: "Canon EOS Rebel T7 DSLR Camera",
        price: 54999,
        image: "https://images-cdn.ubuy.co.in/6486d6aaa738d958d40ef104-canon-eos-rebel-t7-dslr-camera-with.jpg",
        company: "Canon",
        details: ["24.1 Megapixel CMOS Sensor", "DIGIC 4+ Image Processor", "Full HD 1080p video recording"],
        category: "Electronics"
    },
    {
        name: "Women's Leather Handbag",
        price: 2999,
        image: "https://m.media-amazon.com/images/I/71jX3IIqu7L._SY500_.jpg",
        company: "Designer Brand",
        details: ["Material: Genuine leather", "Color: Black", "Size: Medium"],
        category: "Fashion"
    },
    {
        name: "Apple MacBook Air (13-inch)",
        price: 92990,
        image: "https://www.myimaginestore.com/media/catalog/product/cache/4a48ac28cbb6e9c41470e5be5a6d3043/a/i/air-gold_2.jpeg",
        company: "Apple",
        details: ["13.3 inch Retina display with True Tone", "Apple M1 chip", "8GB RAM, 256GB SSD"],
        category: "Computers"
    },
    {
        name: "LG 1.5 Ton 5 Star Inverter Split AC",
        price: 46990,
        image: "https://m.media-amazon.com/images/I/51yCJDngeLL._AC_UF1000,1000_QL80_.jpg",
        company: "LG",
        details: ["1.5 Ton capacity", "5-star energy rating", "Dual Inverter compressor"],
        category: "Appliances"
    },
    {
        name: "Sony PlayStation 5 Console",
        price: 49999,
        image: "https://m.media-amazon.com/images/I/51mWHXY8hyL.jpg",
        company: "Sony",
        details: ["8-core AMD Zen 2 CPU", "Ray-tracing support", "825GB SSD storage"],
        category: "Electronics"
    },
    {
        name: "Women's Summer Dress",
        price: 1499,
        image: "https://m.media-amazon.com/images/I/61idNov5fcL._SY550_.jpg",
        company: "Fashionista",
        details: ["Material: Cotton", "Size: Medium", "Color: Floral print"],
        category: "Fashion"
    },
    {
        name: "Apple iPad Pro (11-inch, Wi-Fi, 128GB)",
        price: 69900,
        image: "https://m.media-amazon.com/images/I/81gC7frRJyL._AC_UY218_.jpg",
        company: "Apple",
        details: ["11-inch Liquid Retina display", "Apple M1 chip with Neural Engine", "Face ID for secure authentication"],
        category: "Computers"
    },
    {
        name: "Samsung 324 L 3 Star Inverter Frost-Free Double Door Refrigerator",
        price: 33990,
        image: "https://m.media-amazon.com/images/I/71i66oKRhFL._AC_UY218_.jpg",
        company: "Samsung",
        details: ["324 L capacity", "Frost-free operation", "Digital Inverter Technology"],
        category: "Appliances"
    },
    {
        name: "JBL Flip 5 Bluetooth Speaker",
        price: 8999,
        image: "https://m.media-amazon.com/images/I/71zDU8JBLZL._AC_UY218_.jpg",
        company: "JBL",
        details: ["Wireless Bluetooth streaming", "12 hours of playtime", "IPX7 waterproof"],
        category: "Electronics"
    },
    {
        name: "Men's Leather Wallet",
        price: 799,
        image: "https://m.media-amazon.com/images/I/915F9zfNP4L._AC_UL320_.jpg",
        company: "Leather Craft",
        details: ["Material: Genuine leather", "Color: Brown", "Multiple card slots and compartments"],
        category: "Fashion"
    },
    {
        name: "Dell XPS 13 Laptop",
        price: 149990,
        image: "https://m.media-amazon.com/images/I/51SGA9AdUyL._AC_UY218_.jpg",
        company: "Dell",
        details: ["13.4 inch 4K Ultra HD InfinityEdge touch display", "Intel Core i7 processor", "16GB RAM, 1TB SSD"],
        category: "Computers"
    },
    {
        name: "LG 7.0 kg Inverter Fully-Automatic Front Loading Washing Machine",
        price: 35990,
        image: "https://m.media-amazon.com/images/I/712rc3pxl4L._AC_UY218_.jpg",
        company: "LG",
        details: ["7.0 kg capacity", "6 motion direct drive technology", "Inverter direct drive technology"],
        category: "Appliances"
    },
];

module.exports = { data: products }