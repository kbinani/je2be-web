import React from "react";
import { gettext } from "../i18n";

const VSpace: React.FC = () => {
  return <div>&nbsp;</div>;
};

const Link: React.FC<{ url: string }> = ({ url }) => {
  return (
    <a target={"_blank"} href={url}>
      {url}
    </a>
  );
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
        {name}: <Link url={url} />
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
        <div>About je2be-web</div>
        <VSpace />
        <div>Copyright (C) kbinani 2022</div>
        <VSpace />
        <div>
          This program is free software: you can redistribute it and/or modify
          it under the terms of the GNU Affero General Public License as
          published by the Free Software Foundation, either version 3 of the
          License, or (at your option) any later version. This program is
          distributed in the hope that it will be useful, but WITHOUT ANY
          WARRANTY; without even the implied warranty of MERCHANTABILITY or
          FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public
          License for more details. You should have received a copy of the GNU
          Affero General Public License along with this program. If not, see
          &lt;
          <Link url={"https://www.gnu.org/licenses/"} />
          &gt;.
        </div>
        <VSpace />
        <div>Open source licenses</div>
        <VSpace />
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
          JSZip is dual licensed. At your choice you may use it under the MIT
          license *or* the GPLv3
          <br />
          license.
          <br />
          <br />
          The MIT License
          <br />
          ===============
          <br />
          <br />
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
          <br />
          <br />
          <br />
          GPL version 3<br />
          =============
          <br />
          <br />
          GNU GENERAL PUBLIC LICENSE
          <br />
          Version 3, 29 June 2007
          <br />
          <br />
          Copyright (C) 2007 Free Software Foundation, Inc.
          &lt;http://fsf.org/&gt;
          <br />
          Everyone is permitted to copy and distribute verbatim copies
          <br />
          of this license document, but changing it is not allowed.
          <br />
          <br />
          Preamble
          <br />
          <br />
          The GNU General Public License is a free, copyleft license for
          <br />
          software and other kinds of works.
          <br />
          <br />
          The licenses for most software and other practical works are designed
          <br />
          to take away your freedom to share and change the works. By contrast,
          <br />
          the GNU General Public License is intended to guarantee your freedom
          to
          <br />
          share and change all versions of a program--to make sure it remains
          free
          <br />
          software for all its users. We, the Free Software Foundation, use the
          <br />
          GNU General Public License for most of our software; it applies also
          to
          <br />
          any other work released this way by its authors. You can apply it to
          <br />
          your programs, too.
          <br />
          <br />
          When we speak of free software, we are referring to freedom, not
          <br />
          price. Our General Public Licenses are designed to make sure that you
          <br />
          have the freedom to distribute copies of free software (and charge for
          <br />
          them if you wish), that you receive source code or can get it if you
          <br />
          want it, that you can change the software or use pieces of it in new
          <br />
          free programs, and that you know you can do these things.
          <br />
          <br />
          To protect your rights, we need to prevent others from denying you
          <br />
          these rights or asking you to surrender the rights. Therefore, you
          have
          <br />
          certain responsibilities if you distribute copies of the software, or
          if
          <br />
          you modify it: responsibilities to respect the freedom of others.
          <br />
          <br />
          For example, if you distribute copies of such a program, whether
          <br />
          gratis or for a fee, you must pass on to the recipients the same
          <br />
          freedoms that you received. You must make sure that they, too, receive
          <br />
          or can get the source code. And you must show them these terms so they
          <br />
          know their rights.
          <br />
          <br />
          Developers that use the GNU GPL protect your rights with two steps:
          <br />
          (1) assert copyright on the software, and (2) offer you this License
          <br />
          giving you legal permission to copy, distribute and/or modify it.
          <br />
          <br />
          For the developers' and authors' protection, the GPL clearly explains
          <br />
          that there is no warranty for this free software. For both users' and
          <br />
          authors' sake, the GPL requires that modified versions be marked as
          <br />
          changed, so that their problems will not be attributed erroneously to
          <br />
          authors of previous versions.
          <br />
          <br />
          Some devices are designed to deny users access to install or run
          <br />
          modified versions of the software inside them, although the
          manufacturer
          <br />
          can do so. This is fundamentally incompatible with the aim of
          <br />
          protecting users' freedom to change the software. The systematic
          <br />
          pattern of such abuse occurs in the area of products for individuals
          to
          <br />
          use, which is precisely where it is most unacceptable. Therefore, we
          <br />
          have designed this version of the GPL to prohibit the practice for
          those
          <br />
          products. If such problems arise substantially in other domains, we
          <br />
          stand ready to extend this provision to those domains in future
          versions
          <br />
          of the GPL, as needed to protect the freedom of users.
          <br />
          <br />
          Finally, every program is threatened constantly by software patents.
          <br />
          States should not allow patents to restrict development and use of
          <br />
          software on general-purpose computers, but in those that do, we wish
          to
          <br />
          avoid the special danger that patents applied to a free program could
          <br />
          make it effectively proprietary. To prevent this, the GPL assures that
          <br />
          patents cannot be used to render the program non-free.
          <br />
          <br />
          The precise terms and conditions for copying, distribution and
          <br />
          modification follow.
          <br />
          <br />
          TERMS AND CONDITIONS
          <br />
          <br />
          0. Definitions.
          <br />
          <br />
          "This License" refers to version 3 of the GNU General Public License.
          <br />
          <br />
          "Copyright" also means copyright-like laws that apply to other kinds
          of
          <br />
          works, such as semiconductor masks.
          <br />
          <br />
          "The Program" refers to any copyrightable work licensed under this
          <br />
          License. Each licensee is addressed as "you". "Licensees" and
          <br />
          "recipients" may be individuals or organizations.
          <br />
          <br />
          To "modify" a work means to copy from or adapt all or part of the work
          <br />
          in a fashion requiring copyright permission, other than the making of
          an
          <br />
          exact copy. The resulting work is called a "modified version" of the
          <br />
          earlier work or a work "based on" the earlier work.
          <br />
          <br />
          A "covered work" means either the unmodified Program or a work based
          <br />
          on the Program.
          <br />
          <br />
          To "propagate" a work means to do anything with it that, without
          <br />
          permission, would make you directly or secondarily liable for
          <br />
          infringement under applicable copyright law, except executing it on a
          <br />
          computer or modifying a private copy. Propagation includes copying,
          <br />
          distribution (with or without modification), making available to the
          <br />
          public, and in some countries other activities as well.
          <br />
          <br />
          To "convey" a work means any kind of propagation that enables other
          <br />
          parties to make or receive copies. Mere interaction with a user
          through
          <br />
          a computer network, with no transfer of a copy, is not conveying.
          <br />
          <br />
          An interactive user interface displays "Appropriate Legal Notices"
          <br />
          to the extent that it includes a convenient and prominently visible
          <br />
          feature that (1) displays an appropriate copyright notice, and (2)
          <br />
          tells the user that there is no warranty for the work (except to the
          <br />
          extent that warranties are provided), that licensees may convey the
          <br />
          work under this License, and how to view a copy of this License. If
          <br />
          the interface presents a list of user commands or options, such as a
          <br />
          menu, a prominent item in the list meets this criterion.
          <br />
          <br />
          1. Source Code.
          <br />
          <br />
          The "source code" for a work means the preferred form of the work
          <br />
          for making modifications to it. "Object code" means any non-source
          <br />
          form of a work.
          <br />
          <br />
          A "Standard Interface" means an interface that either is an official
          <br />
          standard defined by a recognized standards body, or, in the case of
          <br />
          interfaces specified for a particular programming language, one that
          <br />
          is widely used among developers working in that language.
          <br />
          <br />
          The "System Libraries" of an executable work include anything, other
          <br />
          than the work as a whole, that (a) is included in the normal form of
          <br />
          packaging a Major Component, but which is not part of that Major
          <br />
          Component, and (b) serves only to enable use of the work with that
          <br />
          Major Component, or to implement a Standard Interface for which an
          <br />
          implementation is available to the public in source code form. A<br />
          "Major Component", in this context, means a major essential component
          <br />
          (kernel, window system, and so on) of the specific operating system
          <br />
          (if any) on which the executable work runs, or a compiler used to
          <br />
          produce the work, or an object code interpreter used to run it.
          <br />
          <br />
          The "Corresponding Source" for a work in object code form means all
          <br />
          the source code needed to generate, install, and (for an executable
          <br />
          work) run the object code and to modify the work, including scripts to
          <br />
          control those activities. However, it does not include the work's
          <br />
          System Libraries, or general-purpose tools or generally available free
          <br />
          programs which are used unmodified in performing those activities but
          <br />
          which are not part of the work. For example, Corresponding Source
          <br />
          includes interface definition files associated with source files for
          <br />
          the work, and the source code for shared libraries and dynamically
          <br />
          linked subprograms that the work is specifically designed to require,
          <br />
          such as by intimate data communication or control flow between those
          <br />
          subprograms and other parts of the work.
          <br />
          <br />
          The Corresponding Source need not include anything that users
          <br />
          can regenerate automatically from other parts of the Corresponding
          <br />
          Source.
          <br />
          <br />
          The Corresponding Source for a work in source code form is that
          <br />
          same work.
          <br />
          <br />
          2. Basic Permissions.
          <br />
          <br />
          All rights granted under this License are granted for the term of
          <br />
          copyright on the Program, and are irrevocable provided the stated
          <br />
          conditions are met. This License explicitly affirms your unlimited
          <br />
          permission to run the unmodified Program. The output from running a
          <br />
          covered work is covered by this License only if the output, given its
          <br />
          content, constitutes a covered work. This License acknowledges your
          <br />
          rights of fair use or other equivalent, as provided by copyright law.
          <br />
          <br />
          You may make, run and propagate covered works that you do not
          <br />
          convey, without conditions so long as your license otherwise remains
          <br />
          in force. You may convey covered works to others for the sole purpose
          <br />
          of having them make modifications exclusively for you, or provide you
          <br />
          with facilities for running those works, provided that you comply with
          <br />
          the terms of this License in conveying all material for which you do
          <br />
          not control copyright. Those thus making or running the covered works
          <br />
          for you must do so exclusively on your behalf, under your direction
          <br />
          and control, on terms that prohibit them from making any copies of
          <br />
          your copyrighted material outside their relationship with you.
          <br />
          <br />
          Conveying under any other circumstances is permitted solely under
          <br />
          the conditions stated below. Sublicensing is not allowed; section 10
          <br />
          makes it unnecessary.
          <br />
          <br />
          3. Protecting Users' Legal Rights From Anti-Circumvention Law.
          <br />
          <br />
          No covered work shall be deemed part of an effective technological
          <br />
          measure under any applicable law fulfilling obligations under article
          <br />
          11 of the WIPO copyright treaty adopted on 20 December 1996, or
          <br />
          similar laws prohibiting or restricting circumvention of such
          <br />
          measures.
          <br />
          <br />
          When you convey a covered work, you waive any legal power to forbid
          <br />
          circumvention of technological measures to the extent such
          circumvention
          <br />
          is effected by exercising rights under this License with respect to
          <br />
          the covered work, and you disclaim any intention to limit operation or
          <br />
          modification of the work as a means of enforcing, against the work's
          <br />
          users, your or third parties' legal rights to forbid circumvention of
          <br />
          technological measures.
          <br />
          <br />
          4. Conveying Verbatim Copies.
          <br />
          <br />
          You may convey verbatim copies of the Program's source code as you
          <br />
          receive it, in any medium, provided that you conspicuously and
          <br />
          appropriately publish on each copy an appropriate copyright notice;
          <br />
          keep intact all notices stating that this License and any
          <br />
          non-permissive terms added in accord with section 7 apply to the code;
          <br />
          keep intact all notices of the absence of any warranty; and give all
          <br />
          recipients a copy of this License along with the Program.
          <br />
          <br />
          You may charge any price or no price for each copy that you convey,
          <br />
          and you may offer support or warranty protection for a fee.
          <br />
          <br />
          5. Conveying Modified Source Versions.
          <br />
          <br />
          You may convey a work based on the Program, or the modifications to
          <br />
          produce it from the Program, in the form of source code under the
          <br />
          terms of section 4, provided that you also meet all of these
          conditions:
          <br />
          <br />
          a) The work must carry prominent notices stating that you modified
          <br />
          it, and giving a relevant date.
          <br />
          <br />
          b) The work must carry prominent notices stating that it is
          <br />
          released under this License and any conditions added under section
          <br />
          7. This requirement modifies the requirement in section 4 to
          <br />
          "keep intact all notices".
          <br />
          <br />
          c) You must license the entire work, as a whole, under this
          <br />
          License to anyone who comes into possession of a copy. This
          <br />
          License will therefore apply, along with any applicable section 7
          <br />
          additional terms, to the whole of the work, and all its parts,
          <br />
          regardless of how they are packaged. This License gives no
          <br />
          permission to license the work in any other way, but it does not
          <br />
          invalidate such permission if you have separately received it.
          <br />
          <br />
          d) If the work has interactive user interfaces, each must display
          <br />
          Appropriate Legal Notices; however, if the Program has interactive
          <br />
          interfaces that do not display Appropriate Legal Notices, your
          <br />
          work need not make them do so.
          <br />
          <br />
          A compilation of a covered work with other separate and independent
          <br />
          works, which are not by their nature extensions of the covered work,
          <br />
          and which are not combined with it such as to form a larger program,
          <br />
          in or on a volume of a storage or distribution medium, is called an
          <br />
          "aggregate" if the compilation and its resulting copyright are not
          <br />
          used to limit the access or legal rights of the compilation's users
          <br />
          beyond what the individual works permit. Inclusion of a covered work
          <br />
          in an aggregate does not cause this License to apply to the other
          <br />
          parts of the aggregate.
          <br />
          <br />
          6. Conveying Non-Source Forms.
          <br />
          <br />
          You may convey a covered work in object code form under the terms
          <br />
          of sections 4 and 5, provided that you also convey the
          <br />
          machine-readable Corresponding Source under the terms of this License,
          <br />
          in one of these ways:
          <br />
          <br />
          a) Convey the object code in, or embodied in, a physical product
          <br />
          (including a physical distribution medium), accompanied by the
          <br />
          Corresponding Source fixed on a durable physical medium
          <br />
          customarily used for software interchange.
          <br />
          <br />
          b) Convey the object code in, or embodied in, a physical product
          <br />
          (including a physical distribution medium), accompanied by a<br />
          written offer, valid for at least three years and valid for as
          <br />
          long as you offer spare parts or customer support for that product
          <br />
          model, to give anyone who possesses the object code either (1) a<br />
          copy of the Corresponding Source for all the software in the
          <br />
          product that is covered by this License, on a durable physical
          <br />
          medium customarily used for software interchange, for a price no
          <br />
          more than your reasonable cost of physically performing this
          <br />
          conveying of source, or (2) access to copy the
          <br />
          Corresponding Source from a network server at no charge.
          <br />
          <br />
          c) Convey individual copies of the object code with a copy of the
          <br />
          written offer to provide the Corresponding Source. This
          <br />
          alternative is allowed only occasionally and noncommercially, and
          <br />
          only if you received the object code with such an offer, in accord
          <br />
          with subsection 6b.
          <br />
          <br />
          d) Convey the object code by offering access from a designated
          <br />
          place (gratis or for a charge), and offer equivalent access to the
          <br />
          Corresponding Source in the same way through the same place at no
          <br />
          further charge. You need not require recipients to copy the
          <br />
          Corresponding Source along with the object code. If the place to
          <br />
          copy the object code is a network server, the Corresponding Source
          <br />
          may be on a different server (operated by you or a third party)
          <br />
          that supports equivalent copying facilities, provided you maintain
          <br />
          clear directions next to the object code saying where to find the
          <br />
          Corresponding Source. Regardless of what server hosts the
          <br />
          Corresponding Source, you remain obligated to ensure that it is
          <br />
          available for as long as needed to satisfy these requirements.
          <br />
          <br />
          e) Convey the object code using peer-to-peer transmission, provided
          <br />
          you inform other peers where the object code and Corresponding
          <br />
          Source of the work are being offered to the general public at no
          <br />
          charge under subsection 6d.
          <br />
          <br />
          A separable portion of the object code, whose source code is excluded
          <br />
          from the Corresponding Source as a System Library, need not be
          <br />
          included in conveying the object code work.
          <br />
          <br />
          A "User Product" is either (1) a "consumer product", which means any
          <br />
          tangible personal property which is normally used for personal,
          family,
          <br />
          or household purposes, or (2) anything designed or sold for
          incorporation
          <br />
          into a dwelling. In determining whether a product is a consumer
          product,
          <br />
          doubtful cases shall be resolved in favor of coverage. For a
          particular
          <br />
          product received by a particular user, "normally used" refers to a
          <br />
          typical or common use of that class of product, regardless of the
          status
          <br />
          of the particular user or of the way in which the particular user
          <br />
          actually uses, or expects or is expected to use, the product. A
          product
          <br />
          is a consumer product regardless of whether the product has
          substantial
          <br />
          commercial, industrial or non-consumer uses, unless such uses
          represent
          <br />
          the only significant mode of use of the product.
          <br />
          <br />
          "Installation Information" for a User Product means any methods,
          <br />
          procedures, authorization keys, or other information required to
          install
          <br />
          and execute modified versions of a covered work in that User Product
          from
          <br />
          a modified version of its Corresponding Source. The information must
          <br />
          suffice to ensure that the continued functioning of the modified
          object
          <br />
          code is in no case prevented or interfered with solely because
          <br />
          modification has been made.
          <br />
          <br />
          If you convey an object code work under this section in, or with, or
          <br />
          specifically for use in, a User Product, and the conveying occurs as
          <br />
          part of a transaction in which the right of possession and use of the
          <br />
          User Product is transferred to the recipient in perpetuity or for a
          <br />
          fixed term (regardless of how the transaction is characterized), the
          <br />
          Corresponding Source conveyed under this section must be accompanied
          <br />
          by the Installation Information. But this requirement does not apply
          <br />
          if neither you nor any third party retains the ability to install
          <br />
          modified object code on the User Product (for example, the work has
          <br />
          been installed in ROM).
          <br />
          <br />
          The requirement to provide Installation Information does not include a
          <br />
          requirement to continue to provide support service, warranty, or
          updates
          <br />
          for a work that has been modified or installed by the recipient, or
          for
          <br />
          the User Product in which it has been modified or installed. Access to
          a<br />
          network may be denied when the modification itself materially and
          <br />
          adversely affects the operation of the network or violates the rules
          and
          <br />
          protocols for communication across the network.
          <br />
          <br />
          Corresponding Source conveyed, and Installation Information provided,
          <br />
          in accord with this section must be in a format that is publicly
          <br />
          documented (and with an implementation available to the public in
          <br />
          source code form), and must require no special password or key for
          <br />
          unpacking, reading or copying.
          <br />
          <br />
          7. Additional Terms.
          <br />
          <br />
          "Additional permissions" are terms that supplement the terms of this
          <br />
          License by making exceptions from one or more of its conditions.
          <br />
          Additional permissions that are applicable to the entire Program shall
          <br />
          be treated as though they were included in this License, to the extent
          <br />
          that they are valid under applicable law. If additional permissions
          <br />
          apply only to part of the Program, that part may be used separately
          <br />
          under those permissions, but the entire Program remains governed by
          <br />
          this License without regard to the additional permissions.
          <br />
          <br />
          When you convey a copy of a covered work, you may at your option
          <br />
          remove any additional permissions from that copy, or from any part of
          <br />
          it. (Additional permissions may be written to require their own
          <br />
          removal in certain cases when you modify the work.) You may place
          <br />
          additional permissions on material, added by you to a covered work,
          <br />
          for which you have or can give appropriate copyright permission.
          <br />
          <br />
          Notwithstanding any other provision of this License, for material you
          <br />
          add to a covered work, you may (if authorized by the copyright holders
          of
          <br />
          that material) supplement the terms of this License with terms:
          <br />
          <br />
          a) Disclaiming warranty or limiting liability differently from the
          <br />
          terms of sections 15 and 16 of this License; or
          <br />
          <br />
          b) Requiring preservation of specified reasonable legal notices or
          <br />
          author attributions in that material or in the Appropriate Legal
          <br />
          Notices displayed by works containing it; or
          <br />
          <br />
          c) Prohibiting misrepresentation of the origin of that material, or
          <br />
          requiring that modified versions of such material be marked in
          <br />
          reasonable ways as different from the original version; or
          <br />
          <br />
          d) Limiting the use for publicity purposes of names of licensors or
          <br />
          authors of the material; or
          <br />
          <br />
          e) Declining to grant rights under trademark law for use of some
          <br />
          trade names, trademarks, or service marks; or
          <br />
          <br />
          f) Requiring indemnification of licensors and authors of that
          <br />
          material by anyone who conveys the material (or modified versions of
          <br />
          it) with contractual assumptions of liability to the recipient, for
          <br />
          any liability that these contractual assumptions directly impose on
          <br />
          those licensors and authors.
          <br />
          <br />
          All other non-permissive additional terms are considered "further
          <br />
          restrictions" within the meaning of section 10. If the Program as you
          <br />
          received it, or any part of it, contains a notice stating that it is
          <br />
          governed by this License along with a term that is a further
          <br />
          restriction, you may remove that term. If a license document contains
          <br />
          a further restriction but permits relicensing or conveying under this
          <br />
          License, you may add to a covered work material governed by the terms
          <br />
          of that license document, provided that the further restriction does
          <br />
          not survive such relicensing or conveying.
          <br />
          <br />
          If you add terms to a covered work in accord with this section, you
          <br />
          must place, in the relevant source files, a statement of the
          <br />
          additional terms that apply to those files, or a notice indicating
          <br />
          where to find the applicable terms.
          <br />
          <br />
          Additional terms, permissive or non-permissive, may be stated in the
          <br />
          form of a separately written license, or stated as exceptions;
          <br />
          the above requirements apply either way.
          <br />
          <br />
          8. Termination.
          <br />
          <br />
          You may not propagate or modify a covered work except as expressly
          <br />
          provided under this License. Any attempt otherwise to propagate or
          <br />
          modify it is void, and will automatically terminate your rights under
          <br />
          this License (including any patent licenses granted under the third
          <br />
          paragraph of section 11).
          <br />
          <br />
          However, if you cease all violation of this License, then your
          <br />
          license from a particular copyright holder is reinstated (a)
          <br />
          provisionally, unless and until the copyright holder explicitly and
          <br />
          finally terminates your license, and (b) permanently, if the copyright
          <br />
          holder fails to notify you of the violation by some reasonable means
          <br />
          prior to 60 days after the cessation.
          <br />
          <br />
          Moreover, your license from a particular copyright holder is
          <br />
          reinstated permanently if the copyright holder notifies you of the
          <br />
          violation by some reasonable means, this is the first time you have
          <br />
          received notice of violation of this License (for any work) from that
          <br />
          copyright holder, and you cure the violation prior to 30 days after
          <br />
          your receipt of the notice.
          <br />
          <br />
          Termination of your rights under this section does not terminate the
          <br />
          licenses of parties who have received copies or rights from you under
          <br />
          this License. If your rights have been terminated and not permanently
          <br />
          reinstated, you do not qualify to receive new licenses for the same
          <br />
          material under section 10.
          <br />
          <br />
          9. Acceptance Not Required for Having Copies.
          <br />
          <br />
          You are not required to accept this License in order to receive or
          <br />
          run a copy of the Program. Ancillary propagation of a covered work
          <br />
          occurring solely as a consequence of using peer-to-peer transmission
          <br />
          to receive a copy likewise does not require acceptance. However,
          <br />
          nothing other than this License grants you permission to propagate or
          <br />
          modify any covered work. These actions infringe copyright if you do
          <br />
          not accept this License. Therefore, by modifying or propagating a
          <br />
          covered work, you indicate your acceptance of this License to do so.
          <br />
          <br />
          10. Automatic Licensing of Downstream Recipients.
          <br />
          <br />
          Each time you convey a covered work, the recipient automatically
          <br />
          receives a license from the original licensors, to run, modify and
          <br />
          propagate that work, subject to this License. You are not responsible
          <br />
          for enforcing compliance by third parties with this License.
          <br />
          <br />
          An "entity transaction" is a transaction transferring control of an
          <br />
          organization, or substantially all assets of one, or subdividing an
          <br />
          organization, or merging organizations. If propagation of a covered
          <br />
          work results from an entity transaction, each party to that
          <br />
          transaction who receives a copy of the work also receives whatever
          <br />
          licenses to the work the party's predecessor in interest had or could
          <br />
          give under the previous paragraph, plus a right to possession of the
          <br />
          Corresponding Source of the work from the predecessor in interest, if
          <br />
          the predecessor has it or can get it with reasonable efforts.
          <br />
          <br />
          You may not impose any further restrictions on the exercise of the
          <br />
          rights granted or affirmed under this License. For example, you may
          <br />
          not impose a license fee, royalty, or other charge for exercise of
          <br />
          rights granted under this License, and you may not initiate litigation
          <br />
          (including a cross-claim or counterclaim in a lawsuit) alleging that
          <br />
          any patent claim is infringed by making, using, selling, offering for
          <br />
          sale, or importing the Program or any portion of it.
          <br />
          <br />
          11. Patents.
          <br />
          <br />
          A "contributor" is a copyright holder who authorizes use under this
          <br />
          License of the Program or a work on which the Program is based. The
          <br />
          work thus licensed is called the contributor's "contributor version".
          <br />
          <br />
          A contributor's "essential patent claims" are all patent claims
          <br />
          owned or controlled by the contributor, whether already acquired or
          <br />
          hereafter acquired, that would be infringed by some manner, permitted
          <br />
          by this License, of making, using, or selling its contributor version,
          <br />
          but do not include claims that would be infringed only as a<br />
          consequence of further modification of the contributor version. For
          <br />
          purposes of this definition, "control" includes the right to grant
          <br />
          patent sublicenses in a manner consistent with the requirements of
          <br />
          this License.
          <br />
          <br />
          Each contributor grants you a non-exclusive, worldwide, royalty-free
          <br />
          patent license under the contributor's essential patent claims, to
          <br />
          make, use, sell, offer for sale, import and otherwise run, modify and
          <br />
          propagate the contents of its contributor version.
          <br />
          <br />
          In the following three paragraphs, a "patent license" is any express
          <br />
          agreement or commitment, however denominated, not to enforce a patent
          <br />
          (such as an express permission to practice a patent or covenant not to
          <br />
          sue for patent infringement). To "grant" such a patent license to a
          <br />
          party means to make such an agreement or commitment not to enforce a
          <br />
          patent against the party.
          <br />
          <br />
          If you convey a covered work, knowingly relying on a patent license,
          <br />
          and the Corresponding Source of the work is not available for anyone
          <br />
          to copy, free of charge and under the terms of this License, through a
          <br />
          publicly available network server or other readily accessible means,
          <br />
          then you must either (1) cause the Corresponding Source to be so
          <br />
          available, or (2) arrange to deprive yourself of the benefit of the
          <br />
          patent license for this particular work, or (3) arrange, in a manner
          <br />
          consistent with the requirements of this License, to extend the patent
          <br />
          license to downstream recipients. "Knowingly relying" means you have
          <br />
          actual knowledge that, but for the patent license, your conveying the
          <br />
          covered work in a country, or your recipient's use of the covered work
          <br />
          in a country, would infringe one or more identifiable patents in that
          <br />
          country that you have reason to believe are valid.
          <br />
          <br />
          If, pursuant to or in connection with a single transaction or
          <br />
          arrangement, you convey, or propagate by procuring conveyance of, a
          <br />
          covered work, and grant a patent license to some of the parties
          <br />
          receiving the covered work authorizing them to use, propagate, modify
          <br />
          or convey a specific copy of the covered work, then the patent license
          <br />
          you grant is automatically extended to all recipients of the covered
          <br />
          work and works based on it.
          <br />
          <br />
          A patent license is "discriminatory" if it does not include within
          <br />
          the scope of its coverage, prohibits the exercise of, or is
          <br />
          conditioned on the non-exercise of one or more of the rights that are
          <br />
          specifically granted under this License. You may not convey a covered
          <br />
          work if you are a party to an arrangement with a third party that is
          <br />
          in the business of distributing software, under which you make payment
          <br />
          to the third party based on the extent of your activity of conveying
          <br />
          the work, and under which the third party grants, to any of the
          <br />
          parties who would receive the covered work from you, a discriminatory
          <br />
          patent license (a) in connection with copies of the covered work
          <br />
          conveyed by you (or copies made from those copies), or (b) primarily
          <br />
          for and in connection with specific products or compilations that
          <br />
          contain the covered work, unless you entered into that arrangement,
          <br />
          or that patent license was granted, prior to 28 March 2007.
          <br />
          <br />
          Nothing in this License shall be construed as excluding or limiting
          <br />
          any implied license or other defenses to infringement that may
          <br />
          otherwise be available to you under applicable patent law.
          <br />
          <br />
          12. No Surrender of Others' Freedom.
          <br />
          <br />
          If conditions are imposed on you (whether by court order, agreement or
          <br />
          otherwise) that contradict the conditions of this License, they do not
          <br />
          excuse you from the conditions of this License. If you cannot convey a
          <br />
          covered work so as to satisfy simultaneously your obligations under
          this
          <br />
          License and any other pertinent obligations, then as a consequence you
          may
          <br />
          not convey it at all. For example, if you agree to terms that obligate
          you
          <br />
          to collect a royalty for further conveying from those to whom you
          convey
          <br />
          the Program, the only way you could satisfy both those terms and this
          <br />
          License would be to refrain entirely from conveying the Program.
          <br />
          <br />
          13. Use with the GNU Affero General Public License.
          <br />
          <br />
          Notwithstanding any other provision of this License, you have
          <br />
          permission to link or combine any covered work with a work licensed
          <br />
          under version 3 of the GNU Affero General Public License into a single
          <br />
          combined work, and to convey the resulting work. The terms of this
          <br />
          License will continue to apply to the part which is the covered work,
          <br />
          but the special requirements of the GNU Affero General Public License,
          <br />
          section 13, concerning interaction through a network will apply to the
          <br />
          combination as such.
          <br />
          <br />
          14. Revised Versions of this License.
          <br />
          <br />
          The Free Software Foundation may publish revised and/or new versions
          of
          <br />
          the GNU General Public License from time to time. Such new versions
          will
          <br />
          be similar in spirit to the present version, but may differ in detail
          to
          <br />
          address new problems or concerns.
          <br />
          <br />
          Each version is given a distinguishing version number. If the
          <br />
          Program specifies that a certain numbered version of the GNU General
          <br />
          Public License "or any later version" applies to it, you have the
          <br />
          option of following the terms and conditions either of that numbered
          <br />
          version or of any later version published by the Free Software
          <br />
          Foundation. If the Program does not specify a version number of the
          <br />
          GNU General Public License, you may choose any version ever published
          <br />
          by the Free Software Foundation.
          <br />
          <br />
          If the Program specifies that a proxy can decide which future
          <br />
          versions of the GNU General Public License can be used, that proxy's
          <br />
          public statement of acceptance of a version permanently authorizes you
          <br />
          to choose that version for the Program.
          <br />
          <br />
          Later license versions may give you additional or different
          <br />
          permissions. However, no additional obligations are imposed on any
          <br />
          author or copyright holder as a result of your choosing to follow a
          <br />
          later version.
          <br />
          <br />
          15. Disclaimer of Warranty.
          <br />
          <br />
          THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
          <br />
          APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
          <br />
          HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT
          WARRANTY
          <br />
          OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED
          TO,
          <br />
          THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
          <br />
          PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE
          PROGRAM
          <br />
          IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST
          OF
          <br />
          ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
          <br />
          <br />
          16. Limitation of Liability.
          <br />
          <br />
          IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
          <br />
          WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR
          CONVEYS
          <br />
          THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
          INCLUDING ANY
          <br />
          GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF
          THE
          <br />
          USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS
          OF
          <br />
          DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR
          THIRD
          <br />
          PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER
          PROGRAMS),
          <br />
          EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY
          OF
          <br />
          SUCH DAMAGES.
          <br />
          <br />
          17. Interpretation of Sections 15 and 16.
          <br />
          <br />
          If the disclaimer of warranty and limitation of liability provided
          <br />
          above cannot be given local legal effect according to their terms,
          <br />
          reviewing courts shall apply local law that most closely approximates
          <br />
          an absolute waiver of all civil liability in connection with the
          <br />
          Program, unless a warranty or assumption of liability accompanies a
          <br />
          copy of the Program in return for a fee.
          <br />
          <br />
          END OF TERMS AND CONDITIONS
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
      <div className="roundButton" onClick={onBack} style={{ margin: 10 }}>
        {gettext("Back")}
      </div>
    </div>
  );
};
