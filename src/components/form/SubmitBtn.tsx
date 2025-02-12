import { Button } from '@/components/ui/button';
import { useNavigation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type SubmitBtnProps = {
  text?: string;
  disabled?: boolean;
  className?: string;
};

const SubmitBtn = ({ text, className }: SubmitBtnProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Button
      type="submit"
      className={`w-full ${className || ''}`}
      disabled={isSubmitting}
    >
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
