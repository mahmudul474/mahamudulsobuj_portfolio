import {PrismaClient} from "@prisma/client";
const db=new PrismaClient();
async function main(){
 await db.profile.upsert({where:{id:"profile"},update:{},create:{id:"profile",name:"Mahamudul Hasan",title:"Shopify Specialist & Creative Developer",bio:"I build clean, premium and conversion-focused Shopify experiences for ambitious brands.",email:"hello@example.com"}});
 const services=[["Shopify Store Design","shopify-store-design","Premium Shopify storefronts designed around UX and conversion.","Strategy, design and Shopify 2.0 implementation."],["Shopify Theme Development","shopify-theme-development","Custom sections, templates and advanced Liquid development.","Clean, reusable and performance-conscious theme engineering."],["CRO & Speed Optimization","cro-speed-optimization","Improve conversion, UX and Core Web Vitals.","Audit the funnel, remove friction and improve performance."]];
 for(const [title,slug,excerpt,description] of services) await db.service.upsert({where:{slug},update:{},create:{title,slug,excerpt,description,featured:true}});
 await db.portfolio.upsert({where:{slug:"kursa"},update:{},create:{title:"Kursa",slug:"kursa",client:"Kursa",category:"Beauty",excerpt:"Premium beauty ecommerce experience.",description:"A conversion-focused Shopify experience with strong product storytelling.",featured:true}});
 await db.blogPost.upsert({where:{slug:"shopify-conversion-framework"},update:{},create:{title:"A Practical Shopify Conversion Framework",slug:"shopify-conversion-framework",excerpt:"A practical framework for better Shopify UX and conversion.",content:"<h2>Start with intent</h2><p>Design every section around customer intent, trust and friction reduction.</p>"}});
 await db.testimonial.create({data:{name:"Client Name",role:"Founder",company:"Brand Co.",quote:"Excellent communication and a very polished Shopify implementation.",rating:5}});
 await db.siteSettings.upsert({where:{id:"main"},update:{},create:{id:"main"}});
}
main().finally(()=>db.$disconnect());
