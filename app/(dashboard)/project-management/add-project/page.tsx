import Typography from "@/components/libs/Typography";
import AddAndUpdateProject from "@/components/project/AddAndUpdateProject";

const AddProject = () => {
  return (
    <div className="space-y-5">
      <Typography variant="h3">Create project</Typography>
      <AddAndUpdateProject />
    </div>
  );
};

export default AddProject;
