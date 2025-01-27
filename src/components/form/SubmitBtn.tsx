import { Button } from '@/components/ui/button';
import { useNavigation } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Import the loading spinner icon

type SubmitBtnProps = {
  text?: string;
  disabled?: boolean;
};

const SubmitBtn = ({ text }: SubmitBtnProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </Button>
  );
};
export default SubmitBtn;
