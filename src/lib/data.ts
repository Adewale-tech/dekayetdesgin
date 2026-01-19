import { addDays } from "date-fns";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageId: string;
  colors: string[];
  sizes: string[];
  description: string;
};

export type Course = {
    id: string;
    title: string;
    instructor: string;
    level: 'Beginner' | 'Advanced';
    duration: string;
    price: number;
    imageId: string;
    description: string;
    modules: { title: string; video_url: string; content: string }[];
};

export type DashboardData = {
    activeCourses: {
        id: string;
        title: string;
        progress: number;
        imageId: string;
    }[];
    upcomingClasses: {
        id: string;
        title: string;
        date: Date;
        time: string;
    }[];
    assignments: {
        id: string;
        title: string;
        course: string;
        dueDate: Date;
        status: 'Submitted' | 'Due Soon' | 'Overdue';
    }[];
}

export const products: Product[] = [
    {
        id: "prod_1",
        name: "Royal Adire Silk Kaftan",
        price: 95000,
        category: "Kaftans",
        imageId: "product-1",
        colors: ["Indigo", "Maroon"],
        sizes: ["One Size"],
        description: "Experience pure luxury with this flowing kaftan made from lustrous silk, featuring authentic hand-dyed Adire patterns from the heart of Yorubaland."
    },
    {
        id: "prod_2",
        name: "Grand Aso-Oke Boubou",
        price: 280000,
        category: "Gowns",
        imageId: "product-2",
        colors: ["Gold/Cream", "Silver/Blue"],
        sizes: ["One Size"],
        description: "A statement piece of artistry, this grand boubou is crafted from prestigious hand-woven Aso-Oke fabric, perfect for the most regal occasions."
    },
    {
        id: "prod_3",
        name: "Embroidered Agbada Set",
        price: 250000,
        category: "Menswear",
        imageId: "product-3",
        colors: ["White", "Royal Blue", "Black"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "Make a powerful statement with this grand Agbada set, a hallmark of Nigerian men's fashion. This three-piece outfit is exquisitely embroidered and tailored for a regal presence."
    },
    {
        id: "prod_4",
        name: "Modern Lace Iro & Buba",
        price: 180000,
        category: "Sets",
        imageId: "product-4",
        colors: ["Blush Pink", "Teal Green"],
        sizes: ["M", "L", "XL"],
        description: "A contemporary twist on the classic Yoruba Iro and Buba set. Made with premium, intricate lace and tailored for a perfect, flattering fit."
    },
    {
        id: "prod_5",
        name: "Ankara Print Peplum Top",
        price: 45000,
        category: "Tops",
        imageId: "product-5",
        colors: ["Multi-color Print"],
        sizes: ["S", "M", "L"],
        description: "A versatile and stylish peplum top made from vibrant, 100% cotton Ankara fabric. Easily pairs with a skirt or trousers for a chic look."
    },
    {
        id: "prod_6",
        name: "Ankara Flared Midi Dress",
        price: 68000,
        category: "Dresses",
        imageId: "product-6",
        colors: ["Multi-color Print"],
        sizes: ["S", "M", "L", "XL"],
        description: "Celebrate Nigerian fashion with this vibrant ready-made Ankara print midi dress. A popular choice for its bold patterns and flattering fit, perfect for any celebration."
    },
    {
        id: "prod_7",
        name: "Isiagu Velvet Tunic",
        price: 110000,
        category: "Menswear",
        imageId: "product-7",
        colors: ["Black", "Burgundy"],
        sizes: ["M", "L", "XL"],
        description: "Embody the pride of the Igbo culture with this luxurious velvet tunic, adorned with the iconic Isiagu (lion head) embroidery. A symbol of prestige and style."
    },
    {
        id: "prod_8",
        name: "Traditional Coral Bead Set",
        price: 75000,
        category: "Accessories",
        imageId: "product-8",
        colors: ["Coral Red"],
        sizes: ["One Size"],
        description: "An essential accessory for Nigerian traditional wear. This authentic coral bead set includes a necklace and matching bracelet to complete your regal look."
    },
    {
        id: "prod_9",
        name: "Pre-Styled Auto Gele",
        price: 35000,
        category: "Accessories",
        imageId: "product-9",
        colors: ["Gold", "Silver", "Red"],
        sizes: ["One Size"],
        description: "Achieve the perfect Gele look in seconds! This pre-styled Auto Gele is expertly crafted for ease and elegance, saving you time without compromising on style."
    },
    {
        id: "prod_10",
        name: "Men's Senator Style Suit",
        price: 85000,
        category: "Menswear",
        imageId: "product-10",
        colors: ["Navy Blue", "Charcoal Grey"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "The epitome of modern Nigerian menswear. This Senator style suit is tailored for a sharp, sophisticated silhouette, perfect for business or formal events."
    },
    {
        id: "prod_11",
        name: "Ankara Wide-Leg Trousers",
        price: 52000,
        category: "Trousers",
        imageId: "product-11",
        colors: ["Multi-color Print"],
        sizes: ["S", "M", "L"],
        description: "Stay on-trend with these comfortable and chic wide-leg trousers in a stunning Ankara print. Features a high-waist design for a flattering look."
    },
    {
        id: "prod_12",
        name: "Off-Shoulder Buba Gown",
        price: 120000,
        category: "Gowns",
        imageId: "product-12",
        colors: ["Emerald Green", "Royal Purple"],
        sizes: ["S", "M", "L", "XL"],
        description: "A glamorous fusion of tradition and trend. This elegant gown features a classic Buba sleeve design with a modern, alluring off-shoulder neckline."
    },
    {
        id: "prod_13",
        name: "Sequin Embellished Aso Ebi",
        price: 220000,
        category: "Gowns",
        imageId: "product-13",
        colors: ["Champagne Gold", "Rose Gold"],
        sizes: ["S", "M", "L"],
        description: "Dazzle at your next event with this breathtaking Aso Ebi gown. Lavishly embellished with sequins and tailored to perfection for a show-stopping entrance."
    },
    {
        id: "prod_14",
        name: "Classic Dashiki Shirt",
        price: 30000,
        category: "Tops",
        imageId: "product-14",
        colors: ["Blue/Gold", "Black/White"],
        sizes: ["M", "L", "XL"],
        description: "A timeless and comfortable Dashiki shirt featuring the iconic Angelina print. A versatile piece for a casual, afrocentric look."
    }
];

export const courses: Course[] = [
    {
        id: "course_1",
        title: "Introduction to Fashion Illustration",
        instructor: "Adanna Okoro",
        level: "Beginner",
        duration: "6 Weeks",
        price: 50000,
        imageId: "course-1",
        description: "Learn the fundamentals of fashion illustration, from basic figure drawing to rendering different fabrics and textures.",
        modules: [
            { title: "Module 1: Basic Anatomy and Proportions", video_url: "", content: "Master the 9-heads fashion figure and create dynamic poses." },
            { title: "Module 2: Sketching Garments and Folds", video_url: "", content: "Learn how to realistically draw clothing on the fashion figure." },
            { title: "Module 3: Introduction to Color Theory", video_url: "", content: "Explore how to use color effectively in your illustrations." },
        ]
    },
    {
        id: "course_2",
        title: "Advanced Pattern Making & Draping",
        instructor: "Bolanle Adebayo",
        level: "Advanced",
        duration: "12 Weeks",
        price: 120000,
        imageId: "course-2",
        description: "Take your design skills to the next level by mastering complex pattern making and the art of draping fabric on a mannequin.",
        modules: [
            { title: "Module 1: Complex Bodice and Sleeve Design", video_url: "", content: "Drafting patterns for intricate top designs." },
            { title: "Module 2: Advanced Draping Techniques", video_url: "", content: "Creating gowns and complex silhouettes directly on the form." },
            { title: "Module 3: Final Project: Collection Piece", video_url: "", content: "Design and create a full garment using your new skills." },
        ]
    },
    {
        id: "course_3",
        title: "Digital Fashion Design with Procreate",
        instructor: "Chioma Nwosu",
        level: "Beginner",
        duration: "8 Weeks",
        price: 75000,
        imageId: "course-5",
        description: "Step into the future of fashion by learning how to create stunning digital illustrations and technical flats using Procreate on the iPad.",
        modules: [
            { title: "Module 1: Procreate Fundamentals for Designers", video_url: "", content: "Learn the essential tools and gestures for fashion design." },
            { title: "Module 2: Creating a Digital Croquis", video_url: "", content: "Develop your own custom fashion figure template." },
            { title: "Module 3: Rendering Fabrics and Prints", video_url: "", content: "Simulate textures like denim, silk, and patterns digitally." },
        ]
    },
    {
        id: "course_4",
        title: "The Business of Fashion",
        instructor: "Ibrahim Sadiq",
        level: "Advanced",
        duration: "10 Weeks",
        price: 95000,
        imageId: "course-6",
        description: "Learn what it takes to launch and run a successful fashion brand, from production and marketing to finance and sales.",
        modules: [
            { title: "Module 1: Brand Building and Marketing", video_url: "", content: "Define your brand identity and reach your target audience." },
            { title: "Module 2: Sourcing and Production Management", video_url: "", content: "Navigate the complexities of manufacturing and supply chains." },
            { title: "Module 3: Retail and E-commerce Strategy", video_url: "", content: "Learn how to sell your collection effectively online and in-store." },
        ]
    }
];

export const dashboardData: DashboardData = {
    activeCourses: [
        { id: "dash_course_1", title: "Introduction to Fashion Illustration", progress: 65, imageId: "course-1" },
        { id: "dash_course_2", title: "Advanced Pattern Making & Draping", progress: 40, imageId: "course-2" },
        { id: "dash_course_3", title: "Digital Fashion Design with Procreate", progress: 80, imageId: "course-5" },
        { id: "dash_course_4", title: "The Business of Fashion", progress: 20, imageId: "course-6" }
    ],
    upcomingClasses: [
        { id: "class_1", title: "Live Q&A: Color Theory", date: addDays(new Date(), 2), time: "4:00 PM" },
        { id: "class_2", title: "Critique Session: Module 2", date: addDays(new Date(), 5), time: "2:00 PM" },
        { id: "class_3", title: "Guest Lecture: Building a Brand", date: addDays(new Date(), 9), time: "6:00 PM" },
    ],
    assignments: [
        { id: "assign_1", title: "Final Illustration Submission", course: "Fashion Illustration", dueDate: addDays(new Date(), 3), status: "Due Soon" },
        { id: "assign_2", title: "Business Plan Draft", course: "The Business of Fashion", dueDate: addDays(new Date(), 10), status: "Submitted" },
        { id: "assign_3", title: "Figure Drawing Practice", course: "Fashion Illustration", dueDate: addDays(new Date(), -2), status: "Overdue" },
    ]
};
