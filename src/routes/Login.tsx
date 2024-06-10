import { KeyIcon, MarkGithubIcon, PersonIcon } from '@primer/octicons-react';
import { ipcRenderer } from 'electron';
import { type FC, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/fields/Button';
import { AppContext } from '../context/App';
import { authGitHub, getGitHubAuthURL } from '../utils/auth/utils';
import { openExternalLink } from '../utils/comms';

export const LoginRoute: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) {
      ipcRenderer.send('reopen-window');
      navigate('/', { replace: true });
    }
  }, [isLoggedIn]);

  const loginUser = useCallback(async () => {
    try {
      openExternalLink(getGitHubAuthURL());
      await authGitHub();
    } catch (err) {
      // Skip
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-4 bg-white dark:bg-gray-dark dark:text-white">
      <Logo className="w-16 h-16" isDark />

      <div className="my-4 px-2.5 py-1.5 font-semibold text-center">
        GitHub Notifications <br /> on your menu bar.
      </div>

      <div className="font-semibold text-center text-sm italic">Login with</div>
      <Button
        name="GitHub"
        icon={MarkGithubIcon}
        label="Login with GitHub"
        class="py-2 mt-2"
        onClick={loginUser}
      />
      <Button
        name="Personal Access Token"
        icon={KeyIcon}
        label="Login with Personal Access Token"
        class="py-2 mt-2"
        onClick={() => navigate('/login-personal-access-token')}
      />
      <Button
        name="OAuth App"
        icon={PersonIcon}
        label="Login with OAuth App"
        class="py-2 mt-2"
        onClick={() => navigate('/login-oauth-app')}
      />
    </div>
  );
};
