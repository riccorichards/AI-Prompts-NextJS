import Feed from "@/components/Feed";

const Home = async () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Generate & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        AI Prompt generator is an open-source tool for moder world to discover,
        create and share creative prompts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
