
import WidgetBuilder from "@/components/widget/WidgetBuilder";

const WidgetPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Widget Builder</h2>
        <p className="text-muted-foreground">
          Customize your chat widget and generate embed code for your website.
        </p>
      </div>
      
      <WidgetBuilder />
    </div>
  );
};

export default WidgetPage;
