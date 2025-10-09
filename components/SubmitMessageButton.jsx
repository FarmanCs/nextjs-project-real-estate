import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

function SubmitMessageButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
      type="submit"
      disabled={pending}
    >
      <FaPaperPlane className="mr-2" />{" "}
      {pending ? "Sendgin . . . " : "Send Message"}
    </button>
  );
}

export default SubmitMessageButton;
