import { T2TLayout } from "@/components/triptotrees/T2TLayout";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    question: "Why do I already have 10 trees in my account?",
    answer:
      "To thank you for your commitment to becoming an 'Agent of Change' and helping to educate your travellers about climate change, we have gifted you 10 trees to get you started on your mission to make travel a force for good!",
  },
  {
    question: "Can I really make a difference by simply gifting a few trees?",
    answer:
      "No one country, government, corporation, or individual can solve climate change alone, we must all work together for a safe, cleaner planet and educate others where we can. Even by gifting a few extra bookings, you can begin to educate and bring awareness to your traveller on the impact of their trip, so every tree really does count and can make a difference!",
  },
  {
    question:
      "What if my client does not click on their link in my email to receive their tree, what happens to that tree?",
    answer:
      "Any tree gifted by you will always be planted, even if the tree is not claimed by your client.",
  },
  {
    question: "How does the calculator work and what does it measure?",
    answer: (
      <>
        <p>
          To start to remove emissions, we need to measure them, and begin to understand where they are coming from - there is a well known saying "If you can't measure it, you can't manage it."
        </p>
        <p>
          Carbon calculators are highly sophisticated tools that use globally agreed methodologies. Trees4Travel uses DEFRA, GHG Protocols and the Cornell University Hotel Sustainability Benchmarking Index to calculate and measure emissions. We calculate across the whole travel spectrum: air transport, ground transport, marine transport, also different types of accommodation, plus now also meetings and events with our Trees4Events tool.
        </p>
        <p>
          On your dedicated Travel Advisor Dashboard, you will find the basic calculator to translate your travellers' trips into trees. By adding in details such as transport type and class, departure, and arrival locations (you can use airport codes too if you do not find the exact departure and airport name), type of accommodation (cruises are included in the accommodation section) and then finally the number of travellers. The calculator is by default set to 'return trip', but you can override this should you need to.
        </p>
        <p>
          Trees4Travel will soon also be adding in options to easily add and calculate transfers and excursions.
        </p>
        <p>
          We can also help companies measure their annual consumption of electricity, water and waste to plan and reduce the carbon emissions from their operations and HQ.
        </p>
      </>
    ),
  },
  {
    question: "How will I know if my traveller has planted any trees?",
    answer:
      "When your traveller purchases trees you will be notified by email and once you, will also receive monthly reports to show your positive impact and progress.",
  },
  {
    question: "Are the trees I plant a carbon offset?",
    answer: (
      <>
        <p>
          No, The actual tree itself, is not a registered offset, but each tree we plant is backed up and connected to a certified renewable energy carbon offset. This is Trees4Travel's unique hybrid climate positive package to help fast track and reverse climate change.
        </p>
        <p>
          To reach our climate goals, we need a combination of approaches, there is no one silver bullet solution. We must all actively try to find ways to reduce our consumption, and reliance on fossil fuels, but also by using carbon offsets, when emissions are hard to reduce and by growing forests.
        </p>
        <p>
          Trees4Travel does therefore not plant trees to offset emissions as such, although the trees will draw down carbon from the atmosphere naturally over time (approx. 164 kg in the first 10 years), however we use the trees as the basis of the calculation, thereby translating TRIPS TO TREES, which is more tangible and much easier to relate to than kgs of GHG emissions.
        </p>
        <p>
          It is then the UN Certified Emission Reductions (CER) - renewable energy carbon credits which are the actual offsets. Subsequently, our reforestation projects are in addition to the carbon credit offsets - essentially, we are doubling our promise!
        </p>
        <p>
          To help you with your climate contribution communications on social media and when talking directly to your travellers, please refer to your marketing kit when referring to our partnership and the work we are doing together.
        </p>
      </>
    ),
  },
  {
    question: "Why are trees and forests critical to combat climate change?",
    answer: (
      <>
        <p>
          Forests are the most efficient natural storehouses of carbon on our planet, however they can be fragile and saplings take time to grow. No credible scientist or conservationist has ever claimed that we can solve the climate crisis with trees alone, but there is plenty of robust scientific evidence to show that we can't get there without them.
        </p>
        <p>
          Nature based solutions are a cost effective, natural technology that is available to us right now and can provide a third of what is needed to limit climate change. Trees, and more specifically, forests, are a crucial part of that; they both regulate local weather patterns and influence the global climate. So, the protection of the world's forests that are still standing and the restoration of forests that have been lost, is essential in the fight against climate change.
        </p>
      </>
    ),
  },
  {
    question: "Where are the trees planted and who are they planted by?",
    answer: (
      <>
        <p>To date, we are growing trees in Nepal, Kenya and Mozambique.</p>
        <p>
          Our tree planting ethos is based on key objectives that benefit planet and people. Trees4Travel works closely with verified tree planting organisations who specialise in reforestation projects in developing countries and who are experts in the local environments.
        </p>
        <p>
          Reforestation is the natural or intentional rewilding of existing forests and woodlands that have been depleted, usually through deforestation. Our reforestation partners allocate the local communities to care for the trees. This alleviates extreme poverty, giving an economic incentive to impacted communities to ensure the wellbeing and longevity of a restoration site. Planting a variety of tree species that are native to a region is also vital to maximise biodiversity and restore ecosystems - some projects also include agroforestry species such as fruit, fodder and construction species designed to provide food security and benefit long-term human needs. Over time these trees will become a source of sustainable income for these communities. The focus is always on long-term strategies to tackle the climate and biodiversity crises and support livelihood needs, supporting nature and people together.
        </p>
      </>
    ),
  },
  {
    question: "Can I choose where to grow my trees?",
    answer: (
      <>
        <p>
          With so much work to do, it is vital that we pool and direct resources to enable impactful results.
        </p>
        <p>
          Trees4Travel is focused on using the collective purchasing power of travel to scale and deliver a large volume of trees and support the areas which need it the most. In this way we can measure and demonstrate real and rapid progress in reforestation, make significant investment in local communities and begin repairing our planet more quickly. Diluting our impact by offering too many projects at once would make them unviable. Trees4Travel therefore selects and guides the planting towards only a few impactful projects at a time, ensuring we plant the right trees, in the right place, in the right way.
        </p>
        <p>
          We are proud to say that Trees4Travel's work, and partnerships currently supports up to 13 of the 17 United Nations Sustainable Development Goals.
        </p>
      </>
    ),
  },
  {
    question: "What is climate change and greenhouse gas (GHG)?",
    answer: (
      <>
        <p>
          Climate change refers to the long-term changes in the Earth's climate that are warming the atmosphere, ocean and land. Climate change is affecting the balance of ecosystems that support life and biodiversity and impacting health. It also causes more extreme weather events, such as more intense and/or frequent hurricanes, floods, heat waves, wildfires, droughts, and leads to sea level rise and coastal erosion as a result of ocean warming, melting of glaciers, and loss of ice sheets.
        </p>
        <p>
          Climate change is primarily caused by the increase in greenhouse gas concentrations in the atmosphere due to human activities. The most significant greenhouse gas is carbon dioxide (CO2), followed by methane (CH4), nitrous oxide (N2O), and others. These gases trap heat from the sun, preventing it from escaping back into space and leading to a warming effect known as the greenhouse effect.
        </p>
        <p>
          Human activities such as the burning of fossil fuels (coal, oil, and natural gas), deforestation, industrial processes, and agricultural practices have substantially increased the concentrations of greenhouse gases in the atmosphere. This enhanced greenhouse effect is causing the Earth's average temperature to rise, leading to various adverse impacts on ecosystems, weather patterns, and human societies.
        </p>
      </>
    ),
  },
  {
    question: "What is carbon offsetting/compensation?",
    answer: (
      <>
        <p>
          Every single activity in our daily lives creates a carbon footprint. The energy and water we consume, the waste we generate, what we eat, how we shop and when we travel.
        </p>
        <p>
          A carbon offset is a way to compensate for your carbon emissions by supporting projects that produce clean energy, or reduce carbon emissions in other ways - a kind of balancing out or neutralising of emissions. It is also a term describing the climate action of buying carbon credit offsets; a direct financial contribution to projects that reduce emissions going into the atmosphere and therefore also benefits the communities around them.
        </p>
        <p>
          As an example, aeroplanes at this moment in time, cannot stop releasing emissions so, if we wish to continue to fly, we need to stop emissions from being released somewhere else - we can do this by supporting and investing into offsets such as renewable energy solutions like solar panels and wind turbines to help power a factory that might otherwise have used coal or fossil fuels to generate electricity.
        </p>
        <p>
          The ultimate goal right now needs to be to reduce emissions. Offsetting should not be an excuse for inaction elsewhere. For all areas that are hard to reduce, we must use carbon offsets while new technologies and solutions are implemented. Carbon offsets can therefore not remove the immediate impact on the environment. Most importantly, any carbon can prevent it from going into the atmosphere and any carbon we can remove from the atmosphere will help.
        </p>
      </>
    ),
  },
];

export function TripToTreesFaq() {
  return (
    <T2TLayout>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">FAQ's</h1>
            <p className="mt-1 text-lg font-medium text-foreground">For Our Travel Advisors</p>
          </div>

          <div className="mt-8 space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">{faq.question}</h2>
                <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </T2TLayout>
  );
}
