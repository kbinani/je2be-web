import React from "react";
import { gettext } from "../i18n";
import { Link } from "./link";

const VSpace: React.FC = () => {
  return <div>&nbsp;</div>;
};

const DependsOn: React.FC<{ name: string; url: string }> = ({
  name,
  url,
  children,
}) => {
  return (
    <>
      <VSpace />
      <div>
        <span className="aboutTitle">{name}</span>: <Link url={url} />
      </div>
      <VSpace />
      <div>{children}</div>
    </>
  );
};

export const About: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const onClickContainer = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onBack();
    }
  };
  return (
    <div className="aboutContainer vFlex" onClick={onClickContainer}>
      <div className="about vFlex">
        <div className="aboutHeader">About je2be-web</div>
        <VSpace />
        <div>Copyright (C) kbinani 2022</div>
        <Link url={"https://github.com/kbinani/je2be-web"} />
        <VSpace />
        <div>
          This program is free software: you can redistribute it and/or modify
          <br />
          it under the terms of the GNU Affero General Public License as
          <br />
          published by the Free Software Foundation, either version 3 of the
          <br />
          License, or (at your option) any later version. This program is
          <br />
          distributed in the hope that it will be useful, but WITHOUT ANY
          <br />
          WARRANTY; without even the implied warranty of MERCHANTABILITY or
          <br />
          FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public
          <br />
          License for more details. You should have received a copy of the GNU
          <br />
          Affero General Public License along with this program. If not, see
          &lt;
          <Link url={"https://www.gnu.org/licenses/"} />
          &gt;.
        </div>
        <VSpace />
        <VSpace />
        <div className="aboutHeader">Open source licenses</div>
        <DependsOn
          name={"client-zip"}
          url={"https://github.com/Touffy/client-zip.git"}
        >
          Copyright 2020 David Junger
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn
          name={"hwm.task"}
          url={"https://github.com/hotwatermorning/hwm.task"}
        >
          Copyright hotwatermorning 2013 - 2015.
          <br />
          Distributed under the Boost Software License, Version 1.0.
          <br />
          (See accompanying file LICENSE_1_0.txt or copy at
          http://www.boost.org/LICENSE_1_0.txt)
        </DependsOn>
        <VSpace />
        <DependsOn name={"json"} url={"https://github.com/nlohmann/json"}>
          MIT License <br />
          <br />
          Copyright (c) 2013-2022 Niels Lohmann
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all
          <br />
          copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN THE
          <br />
          SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn name={"LevelDB"} url={"https://github.com/google/leveldb"}>
          Copyright (c) 2011 The LevelDB Authors. All rights reserved.
          <br />
          <br />
          Redistribution and use in source and binary forms, with or without
          <br />
          modification, are permitted provided that the following conditions are
          <br />
          met:
          <br />
          <br />
          * Redistributions of source code must retain the above copyright
          <br />
          notice, this list of conditions and the following disclaimer.
          <br />
          * Redistributions in binary form must reproduce the above
          <br />
          copyright notice, this list of conditions and the following disclaimer
          <br />
          in the documentation and/or other materials provided with the
          <br />
          distribution.
          <br />
          * Neither the name of Google Inc. nor the names of its
          <br />
          contributors may be used to endorse or promote products derived from
          <br />
          this software without specific prior written permission.
          <br />
          <br />
          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
          <br />
          "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
          <br />
          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
          <br />
          A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
          <br />
          OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
          <br />
          SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
          <br />
          LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
          <br />
          DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
          <br />
          THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
          <br />
          (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
          <br />
          OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        </DependsOn>
        <VSpace />
        <DependsOn
          name={"libminecraft-file"}
          url={"https://github.com/kbinani/libminecraft-file"}
        >
          The MIT License (MIT)
          <br />
          <br />
          Copyright (c) 2020-2022 kbinani
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all
          <br />
          copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN THE
          <br />
          SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn name={"zlib-ng"} url={"https://github.com/zlib-ng/zlib-ng"}>
          (C) 1995-2013 Jean-loup Gailly and Mark Adler
          <br />
          <br />
          This software is provided 'as-is', without any express or implied
          <br />
          warranty. In no event will the authors be held liable for any damages
          <br />
          arising from the use of this software.
          <br />
          <br />
          Permission is granted to anyone to use this software for any purpose,
          <br />
          including commercial applications, and to alter it and redistribute it
          <br />
          freely, subject to the following restrictions:
          <br />
          <br />
          1. The origin of this software must not be misrepresented; you must
          not
          <br />
          claim that you wrote the original software. If you use this software
          <br />
          in a product, an acknowledgment in the product documentation would be
          <br />
          appreciated but is not required.
          <br />
          <br />
          2. Altered source versions must be plainly marked as such, and must
          not be
          <br />
          misrepresented as being the original software.
          <br />
          <br />
          3. This notice may not be removed or altered from any source
          distribution.
        </DependsOn>
        <VSpace />
        <DependsOn
          name={"minizip-ng"}
          url={"https://github.com/zlib-ng/minizip-ng"}
        >
          Condition of use and distribution are the same as zlib:
          <br />
          <br />
          This software is provided 'as-is', without any express or implied
          <br />
          warranty. In no event will the authors be held liable for any damages
          <br />
          arising from the use of this software.
          <br />
          <br />
          Permission is granted to anyone to use this software for any purpose,
          <br />
          including commercial applications, and to alter it and redistribute it
          <br />
          freely, subject to the following restrictions:
          <br />
          <br />
          1. The origin of this software must not be misrepresented; you must
          not
          <br />
          claim that you wrote the original software. If you use this software
          <br />
          in a product, an acknowledgement in the product documentation would be
          <br />
          appreciated but is not required.
          <br />
          2. Altered source versions must be plainly marked as such, and must
          not be
          <br />
          misrepresented as being the original software.
          <br />
          3. This notice may not be removed or altered from any source
          distribution.
        </DependsOn>
        <VSpace />
        <DependsOn name={"xxhash"} url={"https://github.com/stbrumme/xxhash"}>
          MIT License
          <br />
          <br />
          Copyright (c) 2018 Stephan Brumme
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          <br />
          to deal in the Software without restriction, including without
          limitation
          <br />
          the rights to use, copy, modify, merge, publish, distribute,
          sublicense,
          <br />
          and/or sell copies of the Software, and to permit persons to whom the
          Software
          <br />
          is furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included
          <br />
          in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED,
          <br />
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A<br />
          PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
          OR COPYRIGHT
          <br />
          HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
          IN AN ACTION
          <br />
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE
          <br />
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn name={"Dexie.js"} url={"https://github.com/dexie/Dexie.js"}>
          Apache License
          <br />
          Version 2.0, January 2004
          <br />
          http://www.apache.org/licenses/
          <br />
          <br />
          TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
          <br />
          <br />
          1. Definitions.
          <br />
          <br />
          "License" shall mean the terms and conditions for use, reproduction,
          <br />
          and distribution as defined by Sections 1 through 9 of this document.
          <br />
          <br />
          "Licensor" shall mean the copyright owner or entity authorized by
          <br />
          the copyright owner that is granting the License.
          <br />
          <br />
          "Legal Entity" shall mean the union of the acting entity and all
          <br />
          other entities that control, are controlled by, or are under common
          <br />
          control with that entity. For the purposes of this definition,
          <br />
          "control" means (i) the power, direct or indirect, to cause the
          <br />
          direction or management of such entity, whether by contract or
          <br />
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          <br />
          outstanding shares, or (iii) beneficial ownership of such entity.
          <br />
          <br />
          "You" (or "Your") shall mean an individual or Legal Entity
          <br />
          exercising permissions granted by this License.
          <br />
          <br />
          "Source" form shall mean the preferred form for making modifications,
          <br />
          including but not limited to software source code, documentation
          <br />
          source, and configuration files.
          <br />
          <br />
          "Object" form shall mean any form resulting from mechanical
          <br />
          transformation or translation of a Source form, including but
          <br />
          not limited to compiled object code, generated documentation,
          <br />
          and conversions to other media types.
          <br />
          <br />
          "Work" shall mean the work of authorship, whether in Source or
          <br />
          Object form, made available under the License, as indicated by a<br />
          copyright notice that is included in or attached to the work
          <br />
          (an example is provided in the Appendix below).
          <br />
          <br />
          "Derivative Works" shall mean any work, whether in Source or Object
          <br />
          form, that is based on (or derived from) the Work and for which the
          <br />
          editorial revisions, annotations, elaborations, or other modifications
          <br />
          represent, as a whole, an original work of authorship. For the
          purposes
          <br />
          of this License, Derivative Works shall not include works that remain
          <br />
          separable from, or merely link (or bind by name) to the interfaces of,
          <br />
          the Work and Derivative Works thereof.
          <br />
          <br />
          "Contribution" shall mean any work of authorship, including
          <br />
          the original version of the Work and any modifications or additions
          <br />
          to that Work or Derivative Works thereof, that is intentionally
          <br />
          submitted to Licensor for inclusion in the Work by the copyright owner
          <br />
          or by an individual or Legal Entity authorized to submit on behalf of
          <br />
          the copyright owner. For the purposes of this definition, "submitted"
          <br />
          means any form of electronic, verbal, or written communication sent
          <br />
          to the Licensor or its representatives, including but not limited to
          <br />
          communication on electronic mailing lists, source code control
          systems,
          <br />
          and issue tracking systems that are managed by, or on behalf of, the
          <br />
          Licensor for the purpose of discussing and improving the Work, but
          <br />
          excluding communication that is conspicuously marked or otherwise
          <br />
          designated in writing by the copyright owner as "Not a Contribution."
          <br />
          <br />
          "Contributor" shall mean Licensor and any individual or Legal Entity
          <br />
          on behalf of whom a Contribution has been received by Licensor and
          <br />
          subsequently incorporated within the Work.
          <br />
          <br />
          2. Grant of Copyright License. Subject to the terms and conditions of
          <br />
          this License, each Contributor hereby grants to You a perpetual,
          <br />
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          <br />
          copyright license to reproduce, prepare Derivative Works of,
          <br />
          publicly display, publicly perform, sublicense, and distribute the
          <br />
          Work and such Derivative Works in Source or Object form.
          <br />
          <br />
          3. Grant of Patent License. Subject to the terms and conditions of
          <br />
          this License, each Contributor hereby grants to You a perpetual,
          <br />
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          <br />
          (except as stated in this section) patent license to make, have made,
          <br />
          use, offer to sell, sell, import, and otherwise transfer the Work,
          <br />
          where such license applies only to those patent claims licensable
          <br />
          by such Contributor that are necessarily infringed by their
          <br />
          Contribution(s) alone or by combination of their Contribution(s)
          <br />
          with the Work to which such Contribution(s) was submitted. If You
          <br />
          institute patent litigation against any entity (including a<br />
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          <br />
          or a Contribution incorporated within the Work constitutes direct
          <br />
          or contributory patent infringement, then any patent licenses
          <br />
          granted to You under this License for that Work shall terminate
          <br />
          as of the date such litigation is filed.
          <br />
          <br />
          4. Redistribution. You may reproduce and distribute copies of the
          <br />
          Work or Derivative Works thereof in any medium, with or without
          <br />
          modifications, and in Source or Object form, provided that You
          <br />
          meet the following conditions:
          <br />
          <br />
          (a) You must give any other recipients of the Work or
          <br />
          Derivative Works a copy of this License; and
          <br />
          <br />
          (b) You must cause any modified files to carry prominent notices
          <br />
          stating that You changed the files; and
          <br />
          <br />
          (c) You must retain, in the Source form of any Derivative Works
          <br />
          that You distribute, all copyright, patent, trademark, and
          <br />
          attribution notices from the Source form of the Work,
          <br />
          excluding those notices that do not pertain to any part of
          <br />
          the Derivative Works; and
          <br />
          <br />
          (d) If the Work includes a "NOTICE" text file as part of its
          <br />
          distribution, then any Derivative Works that You distribute must
          <br />
          include a readable copy of the attribution notices contained
          <br />
          within such NOTICE file, excluding those notices that do not
          <br />
          pertain to any part of the Derivative Works, in at least one
          <br />
          of the following places: within a NOTICE text file distributed
          <br />
          as part of the Derivative Works; within the Source form or
          <br />
          documentation, if provided along with the Derivative Works; or,
          <br />
          within a display generated by the Derivative Works, if and
          <br />
          wherever such third-party notices normally appear. The contents
          <br />
          of the NOTICE file are for informational purposes only and
          <br />
          do not modify the License. You may add Your own attribution
          <br />
          notices within Derivative Works that You distribute, alongside
          <br />
          or as an addendum to the NOTICE text from the Work, provided
          <br />
          that such additional attribution notices cannot be construed
          <br />
          as modifying the License.
          <br />
          <br />
          You may add Your own copyright statement to Your modifications and
          <br />
          may provide additional or different license terms and conditions
          <br />
          for use, reproduction, or distribution of Your modifications, or
          <br />
          for any such Derivative Works as a whole, provided Your use,
          <br />
          reproduction, and distribution of the Work otherwise complies with
          <br />
          the conditions stated in this License.
          <br />
          <br />
          5. Submission of Contributions. Unless You explicitly state otherwise,
          <br />
          any Contribution intentionally submitted for inclusion in the Work
          <br />
          by You to the Licensor shall be under the terms and conditions of
          <br />
          this License, without any additional terms or conditions.
          <br />
          Notwithstanding the above, nothing herein shall supersede or modify
          <br />
          the terms of any separate license agreement you may have executed
          <br />
          with Licensor regarding such Contributions.
          <br />
          <br />
          6. Trademarks. This License does not grant permission to use the trade
          <br />
          names, trademarks, service marks, or product names of the Licensor,
          <br />
          except as required for reasonable and customary use in describing the
          <br />
          origin of the Work and reproducing the content of the NOTICE file.
          <br />
          <br />
          7. Disclaimer of Warranty. Unless required by applicable law or
          <br />
          agreed to in writing, Licensor provides the Work (and each
          <br />
          Contributor provides its Contributions) on an "AS IS" BASIS,
          <br />
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          <br />
          implied, including, without limitation, any warranties or conditions
          <br />
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A<br />
          PARTICULAR PURPOSE. You are solely responsible for determining the
          <br />
          appropriateness of using or redistributing the Work and assume any
          <br />
          risks associated with Your exercise of permissions under this License.
          <br />
          <br />
          8. Limitation of Liability. In no event and under no legal theory,
          <br />
          whether in tort (including negligence), contract, or otherwise,
          <br />
          unless required by applicable law (such as deliberate and grossly
          <br />
          negligent acts) or agreed to in writing, shall any Contributor be
          <br />
          liable to You for damages, including any direct, indirect, special,
          <br />
          incidental, or consequential damages of any character arising as a
          <br />
          result of this License or out of the use or inability to use the
          <br />
          Work (including but not limited to damages for loss of goodwill,
          <br />
          work stoppage, computer failure or malfunction, or any and all
          <br />
          other commercial damages or losses), even if such Contributor
          <br />
          has been advised of the possibility of such damages.
          <br />
          <br />
          9. Accepting Warranty or Additional Liability. While redistributing
          <br />
          the Work or Derivative Works thereof, You may choose to offer,
          <br />
          and charge a fee for, acceptance of support, warranty, indemnity,
          <br />
          or other liability obligations and/or rights consistent with this
          <br />
          License. However, in accepting such obligations, You may act only
          <br />
          on Your own behalf and on Your sole responsibility, not on behalf
          <br />
          of any other Contributor, and only if You agree to indemnify,
          <br />
          defend, and hold each Contributor harmless for any liability
          <br />
          incurred by, or claims asserted against, such Contributor by reason
          <br />
          of your accepting any such warranty or additional liability.
          <br />
          <br />
          END OF TERMS AND CONDITIONS
          <br />
          <br />
          APPENDIX: How to apply the Apache License to your work.
          <br />
          <br />
          To apply the Apache License to your work, attach the following
          <br />
          boilerplate notice, with the fields enclosed by brackets "{}"<br />
          replaced with your own identifying information. (Don't include
          <br />
          the brackets!) The text should be enclosed in the appropriate
          <br />
          comment syntax for the file format. We also recommend that a<br />
          file or class name and description of purpose be included on the
          <br />
          same "printed page" as the copyright notice for easier
          <br />
          identification within third-party archives.
          <br />
          <br />
          Copyright {"{"}yyyy{"}"} {"{"}name of copyright owner{"}"}
          <br />
          <br />
          Licensed under the Apache License, Version 2.0 (the "License");
          <br />
          you may not use this file except in compliance with the License.
          <br />
          You may obtain a copy of the License at
          <br />
          <br />
          http://www.apache.org/licenses/LICENSE-2.0
          <br />
          <br />
          Unless required by applicable law or agreed to in writing, software
          <br />
          distributed under the License is distributed on an "AS IS" BASIS,
          <br />
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied.
          <br />
          See the License for the specific language governing permissions and
          <br />
          limitations under the License.
        </DependsOn>
        <VSpace />
        <DependsOn name={"jszip"} url={"https://github.com/Stuk/jszip"}>
          Copyright (c) 2009-2016 Stuart Knightley, David Duponchel, Franz
          Buchinger, António Afonso
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in
          <br />
          all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN
          <br />
          THE SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn name={"react"} url={"https://github.com/facebook/react"}>
          MIT License
          <br />
          <br />
          Copyright (c) Facebook, Inc. and its affiliates.
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all
          <br />
          copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN THE
          <br />
          SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn name={"uuid"} url={"https://github.com/uuidjs/uuid"}>
          The MIT License (MIT)
          <br />
          <br />
          Copyright (c) 2010-2020 Robert Kieffer and other contributors
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </DependsOn>
        <VSpace />
        <DependsOn
          name={"emscripten"}
          url={"https://github.com/emscripten-core/emscripten"}
        >
          Copyright (c) 2010-2014 Emscripten authors, see AUTHORS file.
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy
          <br />
          of this software and associated documentation files (the "Software"),
          to deal
          <br />
          in the Software without restriction, including without limitation the
          rights
          <br />
          to use, copy, modify, merge, publish, distribute, sublicense, and/or
          sell
          <br />
          copies of the Software, and to permit persons to whom the Software is
          <br />
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in
          <br />
          all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR
          <br />
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY,
          <br />
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
          SHALL THE
          <br />
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          <br />
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
          ARISING FROM,
          <br />
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          IN
          <br />
          THE SOFTWARE.
        </DependsOn>
      </div>
      <div
        className="roundButton"
        onClick={onBack}
        style={{ marginTop: 10, marginBottom: 20, minWidth: 300 }}
      >
        {gettext("Back")}
      </div>
    </div>
  );
};
